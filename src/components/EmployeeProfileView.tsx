import React from 'react';
import { Employee, Skill, Project } from '@/types/employee';
import { Card, CardBody, CardHeader, Chip, Link, Button } from "@heroui/react";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe, Briefcase, Users, Brain, Calendar, Info, Edit } from 'lucide-react';

interface EmployeeProfileViewProps {
  employee: Employee;
  onEdit: () => void;
}

// 辅助组件：用于展示带图标的条目
const InfoItem: React.FC<{ icon: React.ReactNode; label?: string; value: React.ReactNode; className?: string }> = ({ icon, label, value, className }) => (
  <div className={`flex items-start space-x-2 mb-2 ${className}`}>
    <span className="text-primary mt-0.5">{icon}</span>
    <div className="flex-1">
      {label && <p className="text-xs font-semibold text-foreground-500">{label}</p>}
      <p className="text-sm text-foreground break-words">{value}</p>
    </div>
  </div>
);

// 辅助组件：用于展示区块标题
const SectionTitle: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center">
    {icon && <span className="mr-2 text-primary">{icon}</span>}
    {title}
  </h2>
);

const EmployeeProfileView: React.FC<EmployeeProfileViewProps> = ({ employee, onEdit }) => {
  // 生成随机背景颜色
  const getRandomColor = () => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-amber-100', 'bg-cyan-100'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="space-y-2">
      {/* 顶部个人信息 */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col md:flex-row items-center md:items-start justify-between py-2 px-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-foreground">{employee.name}</h1>
            <p className="text-base text-foreground-500">{employee.title}</p>
            <p className="text-sm text-foreground-400">{employee.department} · {employee.location}</p>
          </div>
          <div className="flex justify-center md:justify-end space-x-2 mt-3 md:mt-0">
            {/* <Button size="sm" color="primary" variant="flat" startContent={<MessageCircle size={16} />}>
              消息
            </Button>
            <Button size="sm" color="primary" variant="flat" startContent={<UserPlus size={16} />}>
              关注
            </Button> */}
            <Button size="sm" color="primary" variant="solid" onPress={onEdit} startContent={<Edit size={16} />}>
              编辑
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 左侧栏：关于、联系方式 */}
        <div className="md:col-span-1 space-y-2">
          {/* 关于 */}
          <Card className="shadow-sm">
            <CardBody className="p-4">
              <SectionTitle title="关于" icon={<Info size={18} />} />
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{employee.bio}</p>
            </CardBody>
          </Card>

          {/* 联系方式 */}
          <Card className="shadow-sm">
            <CardBody className="p-4">
              <SectionTitle title="联系方式" icon={<Phone size={18} />} />
              <div className="space-y-2">
                <InfoItem icon={<Mail size={16} />} value={<Link href={`mailto:${employee.email}`} color="primary" isExternal className="text-sm">{employee.email}</Link>} />
                <InfoItem icon={<Phone size={16} />} value={employee.phone} />
                <InfoItem icon={<MapPin size={16} />} value={employee.location} />
                <InfoItem icon={<Calendar size={16} />} value={employee.timezone} />
              </div>
            </CardBody>
          </Card>

          {/* 社交媒体 */}
          {Object.keys(employee.socialLinks).length > 0 && (
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <SectionTitle title="社交媒体" icon={<Users size={18} />} />
                <div className="space-y-2">
                  {employee.socialLinks.linkedin && (
                    <InfoItem icon={<Linkedin size={16} />} value={<Link href={employee.socialLinks.linkedin} color="primary" isExternal className="text-sm">LinkedIn</Link>} />
                  )}
                  {employee.socialLinks.github && (
                    <InfoItem icon={<Github size={16} />} value={<Link href={employee.socialLinks.github} color="primary" isExternal className="text-sm">GitHub</Link>} />
                  )}
                  {employee.socialLinks.twitter && (
                    <InfoItem icon={<Twitter size={16} />} value={<Link href={employee.socialLinks.twitter} color="primary" isExternal className="text-sm">Twitter</Link>} />
                  )}
                  {employee.socialLinks.personalWebsite && (
                    <InfoItem icon={<Globe size={16} />} value={<Link href={employee.socialLinks.personalWebsite} color="primary" isExternal className="text-sm">个人网站</Link>} />
                  )}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* 右侧栏：技能、项目经验 */}
        <div className="md:col-span-2 space-y-4">
          {/* 技能 */}
          {employee.skills && employee.skills.length > 0 && (
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <SectionTitle title="专业技能" icon={<Brain size={18} />} />
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill: Skill) => (
                    <Chip key={skill.id} color="primary" variant="flat" size="sm" className="mb-1">
                      {skill.name} <span className="text-xs ml-1">({skill.level})</span>
                    </Chip>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* 项目经验 */}
          {employee.projects && employee.projects.length > 0 && (
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <SectionTitle title="项目经验" icon={<Briefcase size={18} />} />
                <div className="space-y-4">
                  {employee.projects.map((project: Project) => (
                    <div key={project.id} className="border-b border-divider last:border-0 pb-4 last:pb-0">
                      <div className="flex">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 ${getRandomColor()}`}>
                          <Briefcase size={18} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
                          <p className="text-sm text-foreground-500">{project.role}</p>
                          <p className="text-xs text-foreground-400 mb-2">
                            {project.startDate} {project.endDate ? `- ${project.endDate}` : '- 至今'}
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      
      {/* 最近更新时间 */}
      {employee.lastUpdated && (
        <div className="text-right mt-2">
          <p className="text-xs text-foreground-400">
            最近更新时间: {new Date(employee.lastUpdated).toLocaleString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfileView;