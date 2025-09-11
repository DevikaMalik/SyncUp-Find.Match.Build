// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { Eye, EyeOff, Github, Chrome, Linkedin } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from '@/components/ui/use-toast';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     skills: ''
//   });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.email || !formData.password) {
//       toast({
//         title: "Missing fields",
//         description: "Please fill in all required fields.",
//         variant: "destructive"
//       });
//       return;
//     }

//     if (!isLogin && !formData.name) {
//       toast({
//         title: "Missing name",
//         description: "Please enter your name to sign up.",
//         variant: "destructive"
//       });
//       return;
//     }

//     const userData = {
//       id: Date.now(),
//       name: formData.name || formData.email.split('@')[0],
//       email: formData.email,
//       skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
//       joinedAt: new Date().toISOString(),
//       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
//       bio: '',
//       achievements: [],
//       verifiedBadges: []
//     };

//     login(userData);
    
//     toast({
//       title: isLogin ? "Welcome back!" : "Account created!",
//       description: isLogin ? "You've successfully logged in." : "Your account has been created successfully."
//     });

//     navigate('/dashboard');
//   };

//   const handleSocialLogin = (provider) => {
//     toast({
//       title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
//     });
//   };

//   return (
//     <>
//       <Helmet>
//         <title>{isLogin ? 'Login' : 'Sign Up'} - SyncUp</title>
//         <meta name="description" content={isLogin ? 'Login to your SyncUp account to access hackathons and team matching.' : 'Create your SyncUp account to start finding hackathon teams and AI coaching.'} />
//         <meta property="og:title" content={`${isLogin ? 'Login' : 'Sign Up'} - SyncUp`} />
//         <meta property="og:description" content={isLogin ? 'Login to your SyncUp account to access hackathons and team matching.' : 'Create your SyncUp account to start finding hackathon teams and AI coaching.'} />
//       </Helmet>

//       <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
//         <div className="max-w-md w-full">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="glass-card p-8 rounded-2xl"
//           >
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold gradient-text mb-2">
//                 {isLogin ? 'Welcome Back' : 'Join SyncUp'}
//               </h1>
//               <p className="text-gray-400">
//                 {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {!isLogin && (
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               )}

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//               </div>

//               {!isLogin && (
//                 <div>
//                   <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
//                     Skills (comma-separated)
//                   </label>
//                   <input
//                     id="skills"
//                     name="skills"
//                     type="text"
//                     value={formData.skills}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     placeholder="e.g., React, Python, UI/UX, Machine Learning"
//                   />
//                 </div>
//               )}

//               <Button type="submit" className="w-full glass-button text-white font-semibold py-3">
//                 {isLogin ? 'Sign In' : 'Create Account'}
//               </Button>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-white/10"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-3 gap-3">
//                 <button
//                   onClick={() => handleSocialLogin('github')}
//                   className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
//                 >
//                   <Github className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleSocialLogin('google')}
//                   className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
//                 >
//                   <Chrome className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleSocialLogin('linkedin')}
//                   className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
//                 >
//                   <Linkedin className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="mt-6 text-center">
//               <button
//                 onClick={() => setIsLogin(!isLogin)}
//                 className="text-sm text-gray-400 hover:text-white transition-colors"
//               >
//                 {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Auth;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Eye, EyeOff, Github, Chrome, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { loginUser, registerUser } from '@/api/auth'; // 🔥 new import

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && !formData.name) {
      toast({
        title: "Missing name",
        description: "Please enter your name to sign up.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      let response;

      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      if (response?.token) {
        const userData = {
          _id: response._id,
          name: response.name,
          email: response.email,
          token: response.token,
          skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.email}`,
          joinedAt: new Date().toISOString(),
          bio: '',
          achievements: [],
          verifiedBadges: []
        };

        login(userData);

        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin ? "You've successfully logged in." : "Your account has been created successfully."
        });

        navigate('/dashboard');
      } else {
        toast({
          title: "Authentication failed",
          description: response?.message || "Something went wrong.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Server error. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialLogin = (provider) => {
  //   toast({
  //     title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
  //   });
  // };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - SyncUp</title>
        <meta name="description" content={isLogin ? 'Login to your SyncUp account to access hackathons and team matching.' : 'Create your SyncUp account to start finding hackathon teams and AI coaching.'} />
        <meta property="og:title" content={`${isLogin ? 'Login' : 'Sign Up'} - SyncUp`} />
        <meta property="og:description" content={isLogin ? 'Login to your SyncUp account to access hackathons and team matching.' : 'Create your SyncUp account to start finding hackathon teams and AI coaching.'} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">
                {isLogin ? 'Welcome Back' : 'Join SyncUp'}
              </h1>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-2">
                    Skills (comma-separated)
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., React, Python, UI/UX, Machine Learning"
                  />
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full glass-button text-white font-semibold py-3">
                {loading ? "Please wait..." : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSocialLogin('github')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Chrome className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleSocialLogin('linkedin')}
                  className="w-full inline-flex justify-center py-3 px-4 border border-white/10 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Auth;
