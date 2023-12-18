import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';

const App: React.FC = ()=> {
  //interfaces
  interface IHuman{
    name: string,
    surname: string,
    age: number,
    getInfo:()=>void
  }
  interface IEmployee<T>{
    salary: number,
    skills: T,
    position: Position,
  }
  interface IStudent<T>{
    groupName: string,
    hobbies: T,
    GPA: number,
    hasPassed: ()=>boolean,
  }

  //enums
  enum Position{
    FrontEnd="FrontEnd",
    BackEnd="BackEnd",
    CyberSec="CyberSec",
    PenTest="PenTest",
  }

  //calasses
  abstract class Human implements IHuman {
    
    age: number
    constructor(private _name: string,private _surname: string,age: number) {
      if(age<0){
        throw new Error("age can not be negative")
      }else{
        this.age=age
      }
    }
    //getters
    get name (): string{
      return this._name
    }
    get surname (): string{
      return this._surname
    }
    get fullname(){
      return(this._name+" "+this._surname)
    }
    //methods
    getInfo(): void{
      console.log("fullname: "+this.fullname+"; age: "+this.age)
    }
  }
  class Employee extends Human implements IEmployee<string[]>{
    salary: number;
    skills: string[];
    position: Position
    constructor(name: string,surname: string,age: number,salary: number,skills: string[],position: Position){
      super(name,surname,age)
      this.salary=salary
      this.skills=skills
      this.position=position
    }
  }
  class Student extends Human implements IStudent<string[]>{
    groupName: string;
    hobbies: string[];
    private _GPA: number;
    constructor(name: string,surname: string,age: number,groupName: string,hobbies: string[],GPA: number){
      super(name,surname,age)
      if(GPA>=0 && GPA<=100){
        this._GPA=GPA
      }else{
        this._GPA=0
      }
      this.groupName=groupName
      this.hobbies=hobbies
    }
    //getters
    get GPA(){
      return this._GPA
    }
    //setters
    set GPA(gpaVal: number){
      if(gpaVal>=0 && gpaVal<=100){
        this._GPA=gpaVal
      }
    }
    //methods
    hasPassed():boolean{
      if(this._GPA>50){
        return true
      }else{
        return false
      }
    }
  }
  const [name,setName]=useState<string>("")
  const [surname,setSurname]=useState<string>("")
  const [age,setAge]=useState<number>(0)
  const [groupName,setGroupName]=useState<string>("")
  const [hobbies,setHobbies]=useState<string>("")
  const [GPA,setGPA]=useState<number>(0)
  const [salary,setSalary]=useState<number>(0)
  const [skills,setSkills]=useState<string>("")
  const [position,setPosition]=useState<Position>(Position.PenTest)
  const [classType,setClassType]=useState<string>("")
  const [list,setList]=useState<(Employee | Student)[]>([])


  const onSelectChange = (value: string): void => {
    setClassType(value)
  };
  const onPositionChange = (value: Position): void => {
    setPosition(value)
  };
  const handleSubmit = (): void=>{
    if(name && surname){
      if(classType=="employee" && salary>=0 && skills){
        setList([...list,new Employee(name,surname,age,salary,skills.split(",").map(item=>item.trim()),position)])
        setName("")
        setSurname("")
        setAge(0)
        setGroupName("")
        setSalary(0)
        setGPA(0)
        setSkills("")
        setHobbies("")
        setPosition(Position.PenTest)
      }
      else if(classType == "student" && groupName && hobbies){
        setList([...list,new Student(name,surname,age,groupName,hobbies.split(",").map(item=>item.trim()),GPA)])
        setName("")
        setSurname("")
        setAge(0)
        setGroupName("")
        setSalary(0)
        setGPA(0)
        setSkills("")
        setHobbies("")
        setPosition(Position.PenTest)
      }

    }
  }
  return (
    <>
    <div style={{width:"500px",margin:"70px auto",display:"flex",flexDirection:"column",gap:"10px"}}>
      <Input placeholder="Name" value={name} onChange={(e): void=>{setName(e.target.value)}} />
      <Input placeholder="Surname" value={surname} onChange={(e): void=>{setSurname(e.target.value)}} />
      <Input placeholder="Age" type='number' value={age} onChange={(e): void=>{setAge(Number(e.target.value))}} />
      <Select
        style={{width:"100%"}}
        showSearch
        placeholder="Select a Class"
        onChange={onSelectChange}
        options={[
          {
            value: 'employee',
            label: 'Employee',
          },
          {
            value: 'student',
            label: 'Student',
          },
        ]}
      />
      {
        classType=="employee"?
        (<>
          <Input placeholder="Salary" value={salary} type='number' onChange={(e): void=>{setSalary(Number(e.target.value))}} />
          <Input placeholder="Skills" value={skills} onChange={(e): void=>{setSkills(e.target.value)}} />
          <Select
        style={{width:"100%"}}
        showSearch
        placeholder="Select a Position"
        onChange={onPositionChange}
        defaultValue={position}
        options={[
          {
            value: Position.FrontEnd,
            label: 'Front-End',
          },
          {
            value: Position.BackEnd,
            label: 'Back-End',
          },
          {
            value: Position.CyberSec,
            label: 'Cyber Security',
          },
          {
            value: Position.PenTest,
            label: 'Penetration Tester',
          },
        ]}
      />
      <Button type="primary" onClick={handleSubmit} >Submit</Button>
        </>)
        :classType=="student"?(<>
          <Input placeholder="Group Name" value={groupName} onChange={(e): void=>{setGroupName(e.target.value)}} />
          <Input placeholder="Hobbies" value={hobbies} onChange={(e): void=>{setHobbies(e.target.value)}} />
          <Input placeholder="GPA" type='number' value={GPA} onChange={(e): void=>{setGPA(Number(e.target.value))}} />
          <Button type="primary" onClick={handleSubmit} >Submit</Button>
        </>):null
      }
    </div>
      <ul style={{width:"70vw",margin:"30px auto"}}>
        {list?.map((item,index)=><li key={index}>Fullname: {item.fullname} Age: {item.age} {item.constructor.name=="Student"?` Group name: ${item?.groupName} Hobbies: ${item?.hobbies} GPA: ${item?.GPA}`:`Salary: ${item?.salary} Skills: ${item?.skills?.join(", ")} Position: ${item?.position}`}</li>)}
      </ul>
    </>
  )
}

export default App
