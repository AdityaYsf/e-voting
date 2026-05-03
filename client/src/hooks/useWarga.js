import { useState, useEffect, useCallback } from 'react';
import { wargaService } from '../services/apiService.js';

/**
 * useWarga
 * Ambil daftar warga (admin only).
 *
 * Contoh pakai:
 *   const { warga, loading } = useWarga({ status: 'pending' });
 *   const { warga }          = useWarga({ status: 'verified', rt: 'rt01' });
 */
export function useWarga(params = {}) {
  const [warga,   setWarga]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  // Serialise params supaya useEffect tidak infinite loop
  const paramsKey = JSON.stringify(params);

  const fetchWarga = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await wargaService.getAll(params);
      setWarga(data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal memuat data warga.');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  useEffect(() => { fetchWarga(); }, [fetchWarga]);

  return { warga, loading, error, refetch: fetchWarga };
}

/**
 * useVerifikasiWarga
 * Aksi verifikasi dan penolakan warga (admin only).
 *
 * Contoh pakai:
 *   const { verify, reject, loading } = useVerifikasiWarga();
 *   await verify('uid-warga');
 *   await reject('uid-warga', 'Data KTP tidak sesuai');
 */
export function useVerifikasiWarga(onSuccess) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  const wrap = async (fn) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fn();
      setSuccess(res.data?.message || 'Berhasil.');
      onSuccess?.(); // callback untuk refetch list
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, error, success,
    verify: (uid)           => wrap(() => wargaService.verify(uid)),
    reject: (uid, alasan)   => wrap(() => wargaService.reject(uid, alasan)),
  };
}