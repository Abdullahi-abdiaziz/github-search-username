import React, { useState, useEffect } from "react";
import "./github.css";
function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    username: "",
    id: "",
    url: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

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
        company: userData.company,
        twitter: userData.twitter_username,
        message: userData.message,
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
      <header className="search-header df">
        <h1 className="header__title">devfinder</h1>
        <div className="header__mode df">
          <button
            className="mode__btn df"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <span style={{ marginRight: ".5rem" }} className="mode__type">
              {theme === "dark" ? "LIGHT" : "DARK"}
            </span>
            {theme === "dark" ? (
              <span className="icon-sun icon"></span>
            ) : (
              <span className="icon-moon-o icon"></span>
            )}
          </button>
        </div>
      </header>
      <form className="search-form df">
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

      {user.username ? (
        <div className="github-profile">
          <div className="profile__avatar">
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="avatar__img"
            />
          </div>
          <div className="profile__account">
            <div className="account__user df">
              <div className="user__name">
                <h3 className="name__full">
                  {user.name ? user.name : "Anomous User"}
                </h3>
                <h4 className="name__user">@{user.username.toLowerCase()}</h4>
              </div>
              <p className="profile__joined-date">Joined {formattedDate}</p>
            </div>
            <p className="account__bio">
              {user.bio ? user.bio : "This profile has no bio"}
            </p>
            <div className="account__status df">
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
              <div className={user.company ? "" : "light-clr"}>
                <span className="icon-office icon"></span>
                <span>{user.company ? user.company : "Not Available"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 style={{ margin: "2rem" }}>
          <span
            style={{ marginRight: "1rem", fontSize: "2rem", color: "red" }}
            className={user.message ? "icon-warning" : ""}
          ></span>
          {user.message}
        </h3>
      )}
    </div>
  );
}

export default GitHubSearch;
