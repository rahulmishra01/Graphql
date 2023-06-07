import User from "./models/user.js";
import Quote from "./models/quote.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config/index.js";

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    quote: async () => await Quote.find({}).populate("by", "_id firstName"),
    user: async (_, { _id }) => await User.findOne({ _id }),
    quotes: async (_, { by }) => await Quote.find({ by }),
    myProfile: async (_, args, { userId }) => {
      if (!userId) throw new Error("please login first");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (data) => await Quote.find({ by: data._id }),
  },
  Mutation: {
    register: async (_, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) throw new Error("user already exist with this email");
      const hashPassword = await bcrypt.hash(newUser.password, 12);
      const data = new User({
        ...newUser,
        password: hashPassword,
      });
      return await data.save();
    },
    // login: async (_, { loginUser }) => {
    //   const user = await User.findOne({ email: loginUser.email });
    //   if (!user) throw new Error("user not exist");
    //   const matchPassword = await bcrypt.compare(
    //     loginUser.password,
    //     user.password
    //   );
    //   if (!matchPassword) throw new Error("Please enter a correct Password");
    //   const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    //   return { token };
    // },
    login: async (_, { loginUser }) => {
      const user = await User.findOne({ email: loginUser.email });
      if (!user) throw new Error("User does not exist");

      const matchPassword = await bcrypt.compare(
        loginUser.password,
        user.password
      );
      if (!matchPassword) throw new Error("Please enter the correct password");

      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token, ...user._doc };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("please login first");
      const data = new Quote({
        name,
        by: userId,
      });
      await data.save();
      return "quote created";
    },
    updateUser: async (_, { data }) => {
      const { _id, firstName, lastName, email } = data;
      const user = await User.findById(_id);
      if (!user) throw new Error("user not exist with this id");
      if (email && email !== user.email) {
        const existUser = await User.findOne({ email });
        if (existUser)
          throw new Error("email already exist please try another email");
        user.email = email;
      }
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      const updateuser = await user.save();
      return updateuser;
    },
    deleteUser: async (_, { _id }) => {
      const user = await User.findByIdAndRemove({ _id });
      if (!user) throw new Error("user not found");
      await Quote.deleteMany({ by: _id });
      return "user and user created quote deleted";
    },
    updateQuote: async (_, { update }) => {
      const { by, name } = update;
      const quote = await Quote.findById({ _id: by });
      if (!quote) throw new Error("quote not found");
      quote.name = name || quote.name;
      const updateQuote = await quote.save();
      return updateQuote;
    },
    deleteQuoteOnly: async (_, { _id }) => {
      const data = await Quote.findByIdAndRemove(_id);
      if (!data) throw new Error("no Quote yet");
      return "quote deleted";
    },
  },
};
export default resolvers;
