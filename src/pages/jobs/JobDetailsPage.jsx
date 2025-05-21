import useJobDetails from "../../Components/features/hooks/useJobDetails";
import JobContent from "../../Components/features/jobs/JobContent";
import JobHeader from "../../Components/features/jobs/JobHeader";
import JobInfoSection from "../../Components/features/jobs/JobInfoSection";
import JobSkeletonLoader from "../../Components/JobSkeletonLoader";
import ConfirmModal from "../../Components/Modal/ConfirmModal";

const JobDetailsPage = () => {
  const {
    data,
    status,
    error,
    user,
    isPending,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    navigate,
    jobId,
  } = useJobDetails();

  if (status === "pending") {
    return (
      <section className="container mx-auto p-6 mt-6">
        <JobSkeletonLoader />
        <Skeleton />
        <Skeleton />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="container mx-auto p-6 mt-6 text-center text-red-600 font-semibold">
        <p>Error fetching job details: {error.message || "Unknown error"}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="container mx-auto p-6 mt-6 text-center text-gray-700 font-semibold">
        <p>No job found with ID: {jobId}</p>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <section className="container mx-auto p-6 max-w-4xl">
        <div className="rounded-xl shadow-xl bg-white p-8 border border-indigo-100">
          <JobHeader
            onBack={() => navigate(-1)}
            onEdit={() => navigate(`/jobs/edit/${jobId}`)}
            onDelete={handleDeleteClick}
            isPending={isPending}
            canEdit={user?.id === data?.user_id}
          />
          <JobContent title={data.title} description={data.description} job={data} />
          <JobInfoSection requirements={data.requirements} benefits={data.benefits} />
        </div>
      </section>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default JobDetailsPage;
