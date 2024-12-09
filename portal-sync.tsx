import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Globe, AlertTriangle, Check, X } from 'lucide-react';

const PortalSync = () => {
  const [syncStatus] = useState({
    lastSync: '2024-03-09 16:45',
    nextSync: '2024-03-09 17:45',
    stats: {
      total: 145,
      synced: 142,
      failed: 3
    },
    portals: [
      {
        name: 'Idealista',
        status: 'success',
        properties: 142,
        lastUpdate: '2024-03-09 16:45',
        errors: []
      },
      {
        name: 'Fotocasa',
        status: 'warning',
        properties: 138,
        lastUpdate: '2024-03-09 16:43',
        errors: ['Error de conexión en 3 propiedades']
      }
    ]
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sincronización</h1>
          <p className="text-gray-500">Estado de sincronización con portales</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <RefreshCw size={20} />
          Sincronizar Ahora
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SyncMetricCard
          title="Propiedades Sincronizadas"
          value={syncStatus.stats.synced}
          total={syncStatus.stats.total}
        />
        <SyncMetricCard
          title="Última Sincronización"
          value={syncStatus.lastSync}
          label="Próxima: "
          subvalue={syncStatus.nextSync}
        />
        <SyncMetricCard
          title="Errores de Sincronización"
          value={syncStatus.stats.failed}
          status="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {syncStatus.portals.map(portal => (
          <PortalCard key={portal.name} portal={portal} />
        ))}
      </div>
    </div>
  );
};

const SyncMetricCard = ({ title, value, total, label, subvalue, status }) => (
  <Card>
    <CardContent className="p-6">
      <h3 className="text-gray-500 mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {total && (
          <span className="text-gray-500">/ {total}</span>
        )}
      </div>
      {label && subvalue && (
        <p className="text-sm text-gray-500 mt-1">
          {label}{subvalue}
        </p>
      )}
      {status === 'warning' && (
        <div className="flex items-center gap-2 text-yellow-600 mt-2">
          <AlertTriangle size={16} />
          <span className="text-sm">Requiere atención</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const PortalCard = ({ portal }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center gap-2">
          <Globe className="text-gray-400" />
          {portal.name}
        </CardTitle>
        <StatusBadge status={portal.status} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Propiedades sincronizadas</span>
          <span className="font-medium">{portal.properties}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Última actualización</span>
          <span className="font-medium">{portal.lastUpdate}</span>
        </div>
        {portal.errors.length > 0 && (
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle size={16} />
              <span className="font-medium">Errores detectados</span>
            </div>
            <ul className="mt-2 space-y-1">
              {portal.errors.map((error, index) => (
                <li key={index} className="text-sm text-yellow-700">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Ver Detalles
          </button>
          <button className="px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Resincronizar
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }) => {
  const styles = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${styles[status]}`}>
      {status === 'success' && <Check size={14} />}
      {status === 'warning' && <AlertTriangle size={14} />}
      {status === 'error' && <X size={14} />}
      {status === 'success' ? 'Sincronizado' : status === 'warning' ? 'Advertencias' : 'Error'}
    </span>
  );
};

export default PortalSync;