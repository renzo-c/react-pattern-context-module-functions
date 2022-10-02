import { useState } from "react";
import { useUser, updateUser } from "../context/user-context";
import { dequal } from "dequal";

const UserSettings = () => {
  const [{ user, status, error }, userDispatch] = useUser();

  const isPending = status === "pending";
  const isRejected = status === "rejected";

  const [formState, setFormState] = useState(user);

  const isChanged = !dequal(user, formState);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userDispatch, user, formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="username">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="username">
          Biographie
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user);
            userDispatch({ type: "reset" });
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isRejected && !isChanged) || isPending}
        >
          {isPending
            ? "..."
            : isRejected
            ? "✖ Try again"
            : isChanged
            ? "Submit"
            : "✔"}
        </button>
        {isRejected ? (
          <pre style={{ color: "red" }}>{error.message}</pre>
        ) : null}
      </div>
    </form>
  );
};

const UserDataDisplay = () => {
  const [{ user }, _] = useUser();
  return <pre>{JSON.stringify(user, null, 10)}</pre>;
};

export { UserSettings, UserDataDisplay };
