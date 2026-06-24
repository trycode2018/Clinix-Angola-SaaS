import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationFormData } from '../../types';

const schema = yup.object({
  clinic_id: yup.number().required('Clínica é obrigatória'),
  appointment_id: yup.number().nullable().defined(),
  type: yup.string().required('Tipo é obrigatório'),
  recipient: yup.string().required('Destinatário é obrigatório'),
  message: yup.string().required('Mensagem é obrigatória'),
});

interface NotificationFormProps {
  initialData?: Partial<NotificationFormData>;
  onSubmit: (data: NotificationFormData) => void;
  loading?: boolean;
}

const NotificationForm = ({ initialData, onSubmit, loading }: NotificationFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<NotificationFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      clinic_id: 0,
      appointment_id: null,
      type: 'email',
      recipient: '',
      message: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Clínica *</label>
        <input
          type="number"
          {...register('clinic_id', { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.clinic_id && <p className="text-red-500 text-xs mt-1">{errors.clinic_id.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Consulta (opcional)</label>
        <input
          type="number"
          {...register('appointment_id', { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo *</label>
        <select
          {...register('type')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Destinatário *</label>
        <input
          {...register('recipient')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.recipient && <p className="text-red-500 text-xs mt-1">{errors.recipient.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mensagem *</label>
        <textarea
          {...register('message')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default NotificationForm;