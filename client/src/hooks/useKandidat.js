import { useState, useEffect, useCallback } from 'react';
import { kandidatService } from '../services/apiService.js';

/**
 * useKandidat
 * Ambil semua kandidat, opsional filter per kategori.
 *
 * Contoh pakai:
 *   const { kandidat, loading, error } = useKandidat();
 *   const { kandidat } = useKandidat('rw');  // hanya RW
 */
export function useKandidat(kategori = null) {
  const [kandidat, setKandidat] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  const fetchKandidat = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await kandidatService.getAll(kategori);
      setKandidat(data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal memuat data kandidat.');
    } finally {
      setLoading(false);
    }
  }, [kategori]);

  useEffect(() => { fetchKandidat(); }, [fetchKandidat]);

  return { kandidat, loading, error, refetch: fetchKandidat };
}

/**
 * useKandidatDetail
 * Ambil satu kandidat by ID.
 *
 * Contoh pakai:
 *   const { kandidat, loading } = useKandidatDetail('abc123');
 */
export function useKandidatDetail(id) {
  const [kandidat, setKandidat] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    kandidatService.getById(id)
      .then(res => setKandidat(res.data))
      .catch(err => setError(err.response?.data?.error || 'Kandidat tidak ditemukan.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { kandidat, loading, error };
}

/**
 * useKandidatGrouped
 * Ambil semua kandidat lalu kelompokkan per kategori.
 * Cocok untuk ProfilKandidat.jsx yang butuh semua sekaligus.
 *
 * Hasil:
 *   grouped = { rw: [...], rt1: [...], rt2: [...], rt3: [...] }
 */
export function useKandidatGrouped() {
  const { kandidat, loading, error, refetch } = useKandidat();

  const grouped = kandidat.reduce((acc, k) => {
    if (!acc[k.kategori]) acc[k.kategori] = [];
    acc[k.kategori].push(k);
    return acc;
  }, {});

  return { kandidat, grouped, loading, error, refetch };
}

/**
 * useKandidatMutasi (admin only)
 * Create / update / delete kandidat.
 *
 * Contoh pakai:
 *   const { create, update, remove, loading, error } = useKandidatMutasi();
 *   await create(formData);
 */
export function useKandidatMutasi() {
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
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, error, success,
    create: (data)     => wrap(() => kandidatService.create(data)),
    update: (id, data) => wrap(() => kandidatService.update(id, data)),
    remove: (id)       => wrap(() => kandidatService.delete(id)),
  };
}