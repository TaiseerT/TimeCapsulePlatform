export default function CapsuleEditModal({
  isModalOpen,
  handleModalClose,
  handleFormSubmit,
  handleInputChange,
  formData,
}) {
  return (
    <>
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Capsule</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      rows="4"
                      value={formData.content}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="release_date" className="form-label">
                      Release Date
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="release_date"
                      name="release_date"
                      value={formData.release_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
