import React, { useState, useEffect, ChangeEvent } from 'react';
import { Employee, Skill, Project, SocialLinks } from '@/types/employee';
import { Button, Input, Textarea, Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { X, PlusCircle } from 'lucide-react';

interface EmployeeProfileEditProps {
  employee: Employee;
  onSave: (updatedEmployee: Employee) => void;
  onCancel: () => void;
}

// 表单输入组件封装
const FormInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  isTextarea?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  name?: string;
}> = ({ id, label, value, onChange, type = 'text', isTextarea = false, required = false, placeholder, className, name }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={id} className="block text-sm font-medium text-foreground-500 mb-1">
      {label}{required && <span className="text-danger">*</span>}
    </label>
    {isTextarea ? (
      <Textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        isRequired={required}
        className="w-full"
      />
    ) : (
      <Input
        id={id}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isRequired={required}
        className="w-full"
      />
    )}
  </div>
);

const EmployeeProfileEdit: React.FC<EmployeeProfileEditProps> = ({ employee, onSave, onCancel }) => {
  // 使用传入的employee数据初始化表单状态
  const [formData, setFormData] = useState<Employee>(JSON.parse(JSON.stringify(employee))); // 深拷贝以避免直接修改原始数据

  // 当外部employee prop变化时，更新formData
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(employee)));
  }, [employee]);

  // 处理普通输入字段的变化
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 处理社交链接的变化
  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name as keyof SocialLinks]: value,
      },
    }));
  };

  // 处理技能变化
  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = [...formData.skills];
    if (updatedSkills[index]) {
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      setFormData(prev => ({ ...prev, skills: updatedSkills }));
    }
  };

  // 添加新技能
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: `new_skill_${Date.now()}`, name: '', level: '初级' }],
    }));
  };

  // 删除技能
  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  // 处理项目变化
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...formData.projects];
    if (updatedProjects[index]) {
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      setFormData(prev => ({ ...prev, projects: updatedProjects }));
    }
  };

  // 添加新项目
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: `new_project_${Date.now()}`, name: '', description: '', role: '', startDate: '', endDate: '' }],
    }));
  };

  // 删除项目
  const removeProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  // 提交表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEmployee = { ...formData, lastUpdated: new Date() };
    onSave(updatedEmployee);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">编辑员工信息</h2>
          <p className="text-foreground-500">请更新以下员工的详细信息。</p>
        </div>
      </CardHeader>
      <Divider />
      <form onSubmit={handleSubmit}>
        <CardBody className="space-y-6">
          {/* 基本信息区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput id="name" name="name" label="姓名" value={formData.name} onChange={handleChange} required placeholder="请输入姓名" />
            <FormInput id="title" name="title" label="职位" value={formData.title} onChange={handleChange} required placeholder="例如：软件工程师" />
            <FormInput id="department" name="department" label="部门" value={formData.department} onChange={handleChange} placeholder="例如：研发部" />
            <FormInput id="email" name="email" label="邮箱" type="email" value={formData.email} onChange={handleChange} required placeholder="例如：name@example.com" />
            <FormInput id="phone" name="phone" label="电话" type="tel" value={formData.phone} onChange={handleChange} placeholder="例如：13800138000" />
            <FormInput id="location" name="location" label="位置" value={formData.location} onChange={handleChange} placeholder="例如：上海" />
            <FormInput id="timezone" name="timezone" label="时区" value={formData.timezone} onChange={handleChange} placeholder="例如：Asia/Shanghai" />
          </div>
          
          <FormInput id="bio" name="bio" label="个人简介" value={formData.bio} onChange={handleChange} isTextarea placeholder="介绍一下自己..." />

          {/* 社交链接区域 */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">社交链接</h3>
            </CardHeader>
            <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput id="linkedin" label="LinkedIn" name="linkedin" value={formData.socialLinks.linkedin || ''} onChange={handleSocialLinkChange} placeholder="LinkedIn 个人资料URL" />
              <FormInput id="github" label="GitHub" name="github" value={formData.socialLinks.github || ''} onChange={handleSocialLinkChange} placeholder="GitHub 个人资料URL" />
              <FormInput id="twitter" label="Twitter" name="twitter" value={formData.socialLinks.twitter || ''} onChange={handleSocialLinkChange} placeholder="Twitter 个人资料URL" />
              <FormInput id="personalWebsite" label="个人网站" name="personalWebsite" value={formData.socialLinks.personalWebsite || ''} onChange={handleSocialLinkChange} placeholder="个人网站URL" />
            </CardBody>
          </Card>

          {/* 技能区域 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">专业技能</h3>
              <Button color="primary" variant="flat" size="sm" onClick={addSkill} startContent={<PlusCircle size={16} />}>
                添加技能
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={skill.id || index} className="p-3 border rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <FormInput
                    id={`skill_name_${index}`}
                    label="技能名称"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', (e.target as HTMLInputElement).value)}
                    placeholder="例如：React"
                    className="mb-0"
                  />
                  <FormInput
                    id={`skill_level_${index}`}
                    label="熟练度"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, 'level', (e.target as HTMLInputElement).value)}
                    placeholder="例如：高级"
                    className="mb-0"
                  />
                  <Button color="danger" size="sm" onClick={() => removeSkill(index)} className="self-end mb-0 md:mb-1 h-10" startContent={<X size={16} />}>
                    删除
                  </Button>
                </div>
              ))}
              {formData.skills.length === 0 && <p className="text-sm text-foreground-500">暂无技能信息，请点击上方按钮添加。</p>}
            </CardBody>
          </Card>

          {/* 项目经验区域 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">项目经验</h3>
              <Button color="primary" variant="flat" size="sm" onClick={addProject} startContent={<PlusCircle size={16} />}>
                添加项目
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              {formData.projects.map((project, index) => (
                <div key={project.id || index} className="p-4 border rounded-md space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="text-md font-semibold text-foreground">项目 #{index + 1}</h4>
                    <Button color="danger" size="sm" isIconOnly onClick={() => removeProject(index)}>
                      <X size={16} />
                    </Button>
                  </div>
                  <FormInput id={`project_name_${index}`} label="项目名称" value={project.name} onChange={(e) => handleProjectChange(index, 'name', (e.target as HTMLInputElement).value)} placeholder="项目名称" />
                  <FormInput id={`project_role_${index}`} label="角色" value={project.role} onChange={(e) => handleProjectChange(index, 'role', (e.target as HTMLInputElement).value)} placeholder="您在项目中的角色" />
                  <FormInput id={`project_description_${index}`} label="项目描述" value={project.description} onChange={(e) => handleProjectChange(index, 'description', (e.target as HTMLTextAreaElement).value)} isTextarea placeholder="简要描述项目内容和您的贡献" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput id={`project_startDate_${index}`} label="开始日期" type="date" value={project.startDate} onChange={(e) => handleProjectChange(index, 'startDate', (e.target as HTMLInputElement).value)} />
                    <FormInput id={`project_endDate_${index}`} label="结束日期 (可选)" type="date" value={project.endDate || ''} onChange={(e) => handleProjectChange(index, 'endDate', (e.target as HTMLInputElement).value)} />
                  </div>
                </div>
              ))}
              {formData.projects.length === 0 && <p className="text-sm text-foreground-500">暂无项目经验，请点击上方按钮添加。</p>}
            </CardBody>
          </Card>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-end space-x-3">
          <Button variant="flat" onClick={onCancel}>取消</Button>
          <Button color="primary" type="submit">保存更改</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EmployeeProfileEdit;