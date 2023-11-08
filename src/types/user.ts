export type PublicUsersDto = {
  id: number;
  name: string;
  email: string;
  profileImage: string;
};

export type UpdateProfileImageDto = {
  profileImage: string;
};