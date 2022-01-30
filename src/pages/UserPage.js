import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useApiProgress } from "../components/ApiProgress";
import { useParams } from "react-router";
import { getUser } from "../api/userApiCalls";
import ProfileCard from "../components/ProfileCard";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const { username } = useParams();
  //const { username } = props.match.params;
  const pendingApiCall = useApiProgress("/api/1.0/users/" + username);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data.data);
        setError(undefined);
      } catch (error) {
        setError(error.response.data.errorMessage);
      }
    };
    loadUser();
  }, [username]);

  if (pendingApiCall) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: "48px" }}>
              error
            </i>
          </div>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ProfileCard user={user}></ProfileCard>
    </div>
  );
};

export default UserPage;
