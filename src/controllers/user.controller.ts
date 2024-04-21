import { BadRequestException } from '@/lib/exceptions';
import { handleAsync } from '@/middlewares/handle-async';

type CreateUserBody = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
export const createUser = handleAsync<unknown, unknown, CreateUserBody>(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password || !avatar) {
    return next(new BadRequestException('Please fill all the fields'));
  }
  return res.json({ message: 'user created successfully' });
});

export const getAllUsers = handleAsync(async (req, res) => {
  return res.json({ users: ['elon', 'obama'] });
});
