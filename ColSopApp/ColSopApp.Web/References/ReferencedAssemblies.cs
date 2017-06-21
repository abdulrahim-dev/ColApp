using System.Reflection;

namespace ColSopApp.Web.References
{
    public static class ReferencedAssemblies
    {
        public static Assembly Services
        {
            get { return Assembly.Load("ColSopApp.Services"); }
        }

        public static Assembly Repositories
        {
            get { return Assembly.Load("ColSopApp.Data"); }
        }

        public static Assembly Dto
        {
            get
            {
                return Assembly.Load("ColSopApp.Dto");
            }
        }

        public static Assembly Domain
        {
            get
            {
                return Assembly.Load("ColSopApp.Core");
            }
        }
    }
}