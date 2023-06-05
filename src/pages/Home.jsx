import React, { useEffect, useState , useContext} from "react";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const {isAuthenticated} = useContext(Context);


  const updateHandler= async(id)=>{
    try {

      const {data} = await axios.put(`${server}/task/${id}`,
      {},
      {
        withCredentials: true
      }
      );

      toast.success(data.message);
      setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error(e.response.data.message);
    }
  };

  const deleteHandler= async(id)=>{

    try {

      const {data} = await axios.delete(`${server}/task/${id}`,
      {
        withCredentials: true
      }
      );

      toast.success(data.message);
      setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error(e.response.data.message);
    }
    toast.error(id);
  }

  const submitHadler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev)=>!prev);
    } catch (error) {
      toast.error("Task Doesn't add");
      setLoading(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHadler}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              required
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
           title={i.title}
           description={i.description}
           isCompleted={i.isCompleted}
           updateHandler={updateHandler}
           deleteHandler={deleteHandler}
           id={i._id}
           key={i._id} />
        ))}
      </section>
    </div>
  );
};

export default Home;
