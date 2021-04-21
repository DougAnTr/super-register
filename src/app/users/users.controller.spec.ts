describe("UsersControler", () => {
  it("", async () => {
    const usersControler = new UsersControler();
    const newUser = await usersControler.store();

    expect(newUser).toEqual({
      id: 1,
      email: "any_email@mail.com",
    });
  });
});
