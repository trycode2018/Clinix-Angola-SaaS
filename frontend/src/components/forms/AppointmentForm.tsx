import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppointmentFormData } from '../../types';

const schema = yup.object({
  clinic_id: yup.number().required('Clínica é obrigatória'),
  doctor_id: yup.number().required('Médico é obrigatório'),
  patient_id: yup.number().required('Paciente é obrigatório'),
  date: yup.string().required('Data é obrigatória'),
  time: yup.string().required('Hora é obrigatória'),
  notes: yup.string().nullable().defined(),
});

interface AppointmentFormProps {
  initialData?: Partial<AppointmentFormData>;
  onSubmit: (data: AppointmentFormData) => void;
  loading?: boolean;
}

const AppointmentForm = ({ initialData, onSubmit, loading }: AppointmentFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      clinic_id: 0,
      doctor_id: 0,
      patient_id: 0,
      date: '',
      time: '',
      notes: null,
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
        <label className="block text-sm font-medium text-gray-700">Médico *</label>
        <input
          type="number"
          {...register('doctor_id', { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Paciente *</label>
        <input
          type="number"
          {...register('patient_id', { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.patient_id && <p className="text-red-500 text-xs mt-1">{errors.patient_id.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data *</label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hora *</label>
        <input
          type="time"
          {...register('time')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notas</label>
        <textarea
          {...register('notes')}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
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

export default AppointmentForm;