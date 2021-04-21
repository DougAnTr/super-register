class UsersController {
  async store(userData) {
    return {
      id: 1,
      email: userData.email,
    };
  }
}

describe("UsersControler", () => {
  it("Should return new user", async () => {
    const usersControler = new UsersController();

    const newUser = await usersControler.store({
      email: "any_email@mail.com",
      password: "any_password",
    });

    expect(newUser).toEqual({
      id: 1,
      email: "any_email@mail.com",
    });
  });
});
