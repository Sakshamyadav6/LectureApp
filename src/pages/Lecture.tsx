import { useState, useEffect } from "react";
import axios from "axios";
import { LectureInterface } from "../interface/lecture.interface";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "react-bootstrap/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("jwt");
const Lecture = () => {
  const [lectures, setLectures] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8085/lectures", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setLectures(response.data.data);
    } catch (error) {
      console.log("failed");
    }
  };
  const navigate = useNavigate();
  const AddLecture = () => {
    navigate("/lecture/addlecture");
  };

  const handleDelete = async (e: any, id: string) => {
    e.preventDefault;
    const response = await axios.delete(
      `http://localhost:8085/lectures/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    try {
      if (response.status) {
        const filteredLectures = lectures.filter(
          (lectures: LectureInterface) => {
            return lectures._id !== id;
          }
        );
        setLectures(filteredLectures);
        console.log("Deleted Sucessfully");
      }
    } catch (error) {
      console.log("Cant");
    }
  };

  const handleEdit = (e: any, id: string) => {
    navigate(`/lectures/${id}`);
  };
  const LogoutHandle = (e: any) => {
    navigate(`/`);
   }

 
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <h4>Lectures</h4>
        <div>
          <Button variant="success" onClick={AddLecture}>
            Add
          </Button>
          <Button variant="info" onClick={LogoutHandle} style={{float:'right'}}>
            Logout 
          </Button>
          <div>
            <Grid
              container
              rowGap={6}
              columnGap={20}
              justifyContent="space-around"
            >
              {lectures.map((lectures: LectureInterface) => {
                console.log(lectures);
                return (
                  <>
                    <div>
                      <Grid key={lectures._id} item xs={12} sm={6} md={4}>
                        <Card
                          className="lectures-view"
                          style={{ height: 500, width: 400 }}
                        >
                          <video controls style={{ height: 260, width: 400 }}>
                            <source src={lectures.lectureUrl}></source>
                          </video>
                          <CardContent className="lectures-content">
                            <Typography sx={{ fontSize: 30 }} gutterBottom>
                              {lectures.title}{" "}
                            </Typography>
                            <Typography sx={{ fontSize: 22 }} gutterBottom>
                              {lectures.content}{" "}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                              {lectures.duration} hours{" "}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              variant="danger"
                              color="success"
                              onClick={(e: any) =>
                                handleDelete(e, lectures._id)
                              }
                            >
                              Delete
                            </Button>
                            <Button
                              variant="warning"
                              color="error"
                              onClick={(e: any) => handleEdit(e, lectures._id)}
                            >
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    </div>
                  </>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lecture;
