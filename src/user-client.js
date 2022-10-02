const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

async function updateUser(user, updates, signal) {
  sleep(2000);
  if (`${updates.tagline} ${updates.bio}`.includes("fail")) {
    return Promise.reject({ message: "Something went wrong" });
  }
  return { ...user, ...updates };
}

export { updateUser };
