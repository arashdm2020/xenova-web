'use client';

import { useEffect, useState } from 'react';

// تعریف نوع داده برای اعضای تیم
interface TeamMember {
  name: string;
  role: string;
  photo: string;
  skills: string[];
  experience: string;
}

interface TeamData {
  panel_name: string;
  subtitle: string;
  total_advisors: number;
  advisors: TeamMember[];
}

export default function TeamSection() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const response = await fetch('/api/xenova-data');
      const data = await response.json();
      if (data.success && data.data.development_team) {
        setTeamData(data.data.development_team);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات تیم:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!teamData) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {teamData.panel_name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {teamData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.advisors.map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              {/* عکس عضو تیم */}
              <div className="text-center mb-6">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover shadow-lg border-2 border-gray-200 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
              </div>

              {/* مهارت‌ها */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">مهارت‌ها:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* تجربه */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">تجربه:</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 