class UsersController {
  isEmailValid = true;

  async store(userData) {
    if (!this.isEmailValid) {
      throw new InvalidParamError("email");
    }

    return {
      id: 1,
      email: userData.email,
    };
  }
}

class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`The provided param '${paramName}' is invalid`);
  }
}

const makeSut = () => {
  const sut = new UsersController();

  return { sut };
};

describe("UsersControler", () => {
  it("Should return new user", async () => {
    const { sut } = makeSut();

    const newUser = await sut.store({
      email: "any_email@mail.com",
      password: "any_password",
    });

    expect(newUser).toEqual({
      id: 1,
      email: "any_email@mail.com",
    });
  });

  it("Should throw a InvalidParamError if an invalid email is provided", async () => {
    const { sut } = makeSut();
    sut.isEmailValid = false;

    const response = sut.store({
      email: "invalid_email@mail.com",
      password: "any_password",
    });

    expect(response).rejects.toThrow(new InvalidParamError("email"));
  });
});
