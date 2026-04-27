import { useAuditLog } from '../hooks/useAuditLog';

export default function AuditLog() {
  const { logs, latestIsNew } = useAuditLog();

  return (
    <div className="max-h-[274px] overflow-y-auto pr-1">
      {logs.map((log, i) => (
        <div
          key={`${log.time}-${i}`}
          className={[
            'flex items-start gap-2.5 py-2 border-b border-slate-100 last:border-b-0 text-[11.5px]',
            i === 0 && latestIsNew
              ? 'animate-log-in bg-gradient-to-r from-blue-ll to-transparent rounded-[6px] pl-2'
              : '',
          ].join(' ')}
        >
          <div
            className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1"
            style={{ background: log.color }}
          />
          <div className="font-mono text-[9.5px] text-slate-400 flex-shrink-0 w-[52px]">
            {log.time}
          </div>
          <div className="text-slate-600 leading-[1.4] text-[11px]">
            {log.text}
          </div>
        </div>
      ))}
    </div>
  );
}
