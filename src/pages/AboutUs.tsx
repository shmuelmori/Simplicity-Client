import {
    FiTarget,
    FiUsers,
    FiClock,
    FiStar,
    FiLinkedin,
    FiTwitter,
    FiInstagram
} from 'react-icons/fi';
import imgMendel from '../assets/mendel.jpg'
import imgMenush from '../assets/menoshjpg.jpg'
import imgShmuel from '../assets/shmueljpg.jpg'


const AboutUs = () => {
    const features = [
        {
            icon: <FiTarget size={24} />,
            title: "Our Mission",
            description: "To simplify project management and enhance team productivity through intuitive solutions."
        },
        {
            icon: <FiUsers size={24} />,
            title: "Who We Are",
            description: "A dedicated team of innovators passionate about making work management easier."
        },
        {
            icon: <FiClock size={24} />,
            title: "Experience",
            description: "Years of expertise in developing cutting-edge project management solutions."
        },
        {
            icon: <FiStar size={24} />,
            title: "Our Values",
            description: "Committed to excellence, innovation, and customer satisfaction."
        }
    ];

    const teamMembers = [
        {
            name: "Menachem Mendel Cohen",
            role: "Founder & CEO",
            image: imgMendel
        },
        {
            name: "Shmuel Mori",
            role: "Lead Developer",
            image: imgShmuel
        },
        {
            name: "Menachem Mendel",
            role: "DevOps Developer",
            image: imgMenush
        }
    ];

    return (
        <div className="max-w-full mx-auto p-8 bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center">
            <div className='w-[90%]'>
                {/* Hero Section */}
                <div className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700 p-16 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        About Simplicity
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Making project management simple, efficient, and accessible for teams worldwide
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="text-blue-500 dark:text-blue-400 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                key={index}
                                className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center transition transform duration-300"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-8">
                    {[FiLinkedin, FiTwitter, FiInstagram].map((Icon, index) => (
                        <a
                            key={index}
                            href="#"
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                            <Icon size={24} />
                        </a>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center">
                        <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">500+</div>
                        <div className="text-gray-600 dark:text-gray-300">Happy Teams</div>
                    </div>
                    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center">
                        <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">50k+</div>
                        <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
                    </div>
                    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg text-center">
                        <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">99%</div>
                        <div className="text-gray-600 dark:text-gray-300">Customer Satisfaction</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;