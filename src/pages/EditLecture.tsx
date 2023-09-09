import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditLecture = () => {
  const { id } = useParams();
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const [lectures, setLectures] = useState<any>({});
  const [removeVideo, setRemoveVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState<any>(null);

  const getLectureById = async () => {
    const response = await axios.get(`http://localhost:8085/lectures/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLectures(response.data);
    setTitle(response.data.data.title);
    setDuration(response.data.data.duration);
    setContent(response.data.data.content);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("duration", duration);
    if (video) {
      formData.append("video", video);
      formData.append("isVideoEdited", "true");
    } else {
      formData.append("isVideoEdited", "false");
    }
    try {
      const response = await axios.patch(
        `http://localhost:8085/lectures/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/lecture");
      console.log("Video Edited Successfully", response.data);
    } catch (error) {
      console.log("Video Cannot Be Edited", error);
    }
  };

  useEffect(() => {
    getLectureById();
  }, []);

  return (
    <div>
      <h2>Edit Lectures</h2>
      {lectures.status ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter Your Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Your Content</Form.Label>
            <Form.Control
              type="text"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Your Duration</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={(e: any) => setDuration(e.target.value)}
            />
          </Form.Group>
          {removeVideo ? (
            <Form.Group className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control
                type="file"
                onChange={(e: any) => setVideo(e.target.files[0])}
              />
            </Form.Group>
          ) : (
            <div>
              <label>Current Video Playing</label>
              <br />
              <video controls height={200} width={400}>
                <source src={`${lectures.data.lectureUrl}`} />
              </video>
              <Button
                variant="outline-danger"
                onClick={(e: any) => {
                  e.preventDefault();
                  setRemoveVideo(true);
                }}
              >
                Delete
              </Button>
            </div>
          )}
          <Button variant="primary" onClick={(e: any) => handleEdit(e)}>
            Edit Lecture
          </Button>
        </Form>
      ) : (
        <h1 style={{ padding: "200px", textAlign: "center" }}>Loading.....</h1>
      )}
    </div>
  );
};

export default EditLecture;
