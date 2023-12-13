import React, { useState, useEffect } from "react";
import "./github.css";
function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({
    username: "",
    id: "",
    url: "",
    avatar_url: "",
  });

  const getUser = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
      }
      const userData = await response.json();
      console.log(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await getUser(username);
    if (userData) {
      setUser({
        username: userData.login,
        name: userData.name,
        bio: userData.bio,
        date: userData.created_at,
        avatar_url: userData.avatar_url,
        repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        location: userData.location,
        portfolio: userData.blog,
        linkedin: userData.linkedin,
        twitter: userData.twitter_username,
      });
    }
  };

  const joinedDate = new Date(user.date);
  const formattedDate = joinedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="github-search">
      <header className="search-header ">
        <h1 className="header__title">devFinder</h1>
        <div className="header__mode">
          <span className="mode__type">LIGHT</span>
          <span href="" className="icon-sun icon"></span>
        </div>
      </header>
      <form className="search-form">
        <span className="icon-search icon"></span>
        <input
          type="text"
          placeholder="search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input__form"
        />
        <button onClick={handleSubmit} className="btn__form">
          search
        </button>
      </form>

      {user.username && (
        <div className="github-profile">
          <div className="profile__avatar">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="avatar__img"
            />
          </div>
          <div className="profile__account">
            <div className="account__user">
              <div className="user__name">
                <h3 className="name__full">
                  {user.name ? user.name : "Anomous User"}
                </h3>
                <h4 className="name__user">@{user.username.toLowerCase()}</h4>
              </div>
              <p className="profile__joined-date">Joined {formattedDate}</p>
            </div>
            <p className="account__bio">{user.bio ? user.bio : "This profile has no bio"}</p>
            <div className="account__status">
              <div className="account__repos">
                <p>Repos</p>
                <span className="repos__no">{user.repos}</span>
              </div>
              <div className="account__followers">
                <p>Followers</p>
                <span className="followers__no">{user.followers}</span>
              </div>
              <div className="account__following">
                <p>Following</p>
                <span className="following__no">{user.following}</span>
              </div>
            </div>
            <div className="account__info">
              <div className={user.location ? "" : "light-clr"}>
                <span className="icon-map-pin-fill icon"></span>
                <span>{user.location ? user.location : "Not Available"}</span>
              </div>
              <div className={user.twitter ? "" : "light-clr"}>
                <span className="icon-twitter icon"></span>
                <span>{user.twitter ? user.twitter : "Not Available"}</span>
              </div>
              <div className={user.portfolio ? "" : "light-clr"}>
                <span className="icon-link icon"></span>
                <span>{user.portfolio ? user.portfolio : "Not Available"}</span>
              </div>
              <div className={user.location ? "" : "light-clr"}>
                <span className="icon-map-pin-fill icon"></span>
                <span>{user.location ? user.location : "Not Available"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GitHubSearch;
