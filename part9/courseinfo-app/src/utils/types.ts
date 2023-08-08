export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
export interface CoursePartWithDesc extends CoursePartBase {
    description: string;
  }
  
  
export interface CoursePartBasic extends CoursePartWithDesc {
    kind: "basic"
  }
  
export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
export interface CoursePartBackground extends CoursePartWithDesc {
    backgroundMaterial: string;
    kind: "background"
  }

export interface CoursePartWithReqs extends CoursePartWithDesc {
    requirements: string[]
    kind: "special"
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithReqs;