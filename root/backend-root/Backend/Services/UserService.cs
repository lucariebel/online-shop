using Backend.Classes;

namespace Backend.Services
{
    public partial interface IUserService
    {
        User Login(User user);
        User Logout(User user);
        User RegisterUser(User user);
        void DeleteUser(User user);
    }

    public partial class UserService : IUserService
    {
        private User _user;

        public void DeleteUser(User user)
        {
            throw new NotImplementedException();
        }

        public User Login(User user)
        {
            throw new NotImplementedException();
        }

        public User Logout(User user)
        {
            throw new NotImplementedException();
        }

        public User RegisterUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
