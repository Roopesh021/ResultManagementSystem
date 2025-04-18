import { FILE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useRef, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "sonner";
const AddCandidates = () => {
  const [input, setInput] = useState({
    file: "",
  });

  const fileInputRef = useRef(null);

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${FILE_API_END_POINT}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // Add a defensive check for `res` and `res.data`
      if (res && res.data && res.data.success) {
        setInput({ file: "" }); // Reset file in state
        fileInputRef.current.value = ""; // Clear the file input field
        toast.success(res.data.message);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("File upload error:", error);

      // Check if `error.response` exists
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during the file upload.");
      }
    }
  };

  return (
    <>
      <div>
        <div className="a-head">
          <AiOutlineUsergroupAdd className="dash-icon" />
          <h1>AddCandidates</h1>
        </div>
        <div className="a-content">
          <form onSubmit={submitHandler} className="form-section">
            <div className="form-container">
              <input
                type="file"
                id="uploadBtn"
                name="file"
                onChange={changeFileHandler}
                ref={fileInputRef}
              ></input>
              <label htmlFor="uploadBtn">
                <FaCloudUploadAlt />
              </label>
              <button type="submit">Upload</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddCandidates;
