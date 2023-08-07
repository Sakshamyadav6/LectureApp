import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLecture = () => {
  const [video, setVideo] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

      const AddData = async () => {
        console.log(video, title, content, duration);
        const formData = new FormData();
        formData.append("duration", duration);
        formData.append("video", video);
        formData.append("content", content);
        formData.append("title", title);

        try {
          const response = await axios.post(
            "http://localhost:8085/lectures",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          if (response.data.status) {
            console.log("Added Sucessfully");
            navigate("/Lectures");
          }
        } catch (error) {
          console.log("can't add", error);
        }
      };

  return (
    <>
      <h2>Add Lectures</h2>
      <Form
        style={{padding: "20px" }}
      >
        <Form.Group controlId="formTitle">
          <Form.Label>Enter Your Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Enter Your Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDuration">
          <Form.Label>Enter Your Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e: any) => setDuration(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formVideo">
          <Form.Label>Upload Video</Form.Label>
          <Form.Control
            type="file"
            onChange={(e: any) => setVideo(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" onClick={AddData}>
          Add
        </Button>
      </Form>
    </>
  );
};

export default AddLecture;
