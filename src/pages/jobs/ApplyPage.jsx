import { useApplyForm } from "../../Components/features/hooks/useApplyForm";
import ApplyFormFields from "../../Components/features/jobs/applyjob/ApplyFormFields";



const ApplyPage = () => {
  const {
    form,
    loading,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isSubmitDisabled,
  } = useApplyForm();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Add your contact information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ApplyFormFields
          form={form}
          handleChange={handleChange}
          handlePhoneChange={handlePhoneChange}
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-2 rounded transition ${
            isSubmitDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
