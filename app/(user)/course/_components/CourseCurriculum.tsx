"use client";

import { Accordion, AccordionItem, Avatar } from "@heroui/react";
import { PlayCircle, Lock } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  isFree?: boolean;
};

type Chapter = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
};

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: Web Development Overview",
    description:
      "Build a solid foundation before writing your first line of code",
    lessons: [
      {
        id: 1,
        title: "How Does the Web Work?",
        duration: "06:30",
        isFree: true,
      },
      {
        id: 2,
        title: "Frontend vs Backend Explained",
        duration: "08:12",
        isFree: true,
      },
      {
        id: 3,
        title: "The Roadmap to Becoming a Web Developer",
        duration: "10:05",
      },
    ],
  },
  {
    id: 2,
    title: "Chapter 2: HTML & CSS Fundamentals",
    description: "Build your very first web interface",
    lessons: [
      {
        id: 4,
        title: "Standard HTML Structure",
        duration: "12:20",
        isFree: true,
      },
      {
        id: 5,
        title: "CSS Box Model Explained",
        duration: "14:10",
      },
      {
        id: 6,
        title: "Flexbox & Layout Techniques",
        duration: "18:45",
      },
    ],
  },
  {
    id: 3,
    title: "Chapter 3: JavaScript Fundamentals",
    description: "Start thinking like a programmer",
    lessons: [
      {
        id: 7,
        title: "Variables & Data Types",
        duration: "15:00",
      },
      {
        id: 8,
        title: "Functions & Scope",
        duration: "17:30",
      },
      {
        id: 9,
        title: "Arrays & Objects",
        duration: "20:40",
      },
    ],
  },
  {
    id: 4,
    title: "Chapter 4: Advanced JavaScript Deep Dive",
    description: "Master advanced concepts used in real-world projects",
    lessons: [
      {
        id: 10,
        title: "Closures & Hoisting",
        duration: "15:00",
      },
      {
        id: 11,
        title: "Async / Await & Promises",
        duration: "17:30",
      },
      {
        id: 12,
        title: "Event Loop & Performance Optimization",
        duration: "20:40",
      },
    ],
  },
  {
    id: 5,
    title: "Chapter 5: High-Paying Job Interview Preparation",
    description: "Crack technical interviews and land high-paying jobs",
    lessons: [
      {
        id: 13,
        title: "Common JavaScript Interview Questions",
        duration: "15:00",
      },
      {
        id: 14,
        title: "Live Coding Interview Strategies",
        duration: "17:30",
      },
      {
        id: 15,
        title: "Negotiating a $1000+ Salary Offer",
        duration: "20:40",
      },
    ],
  },
];

export default function CourseCurriculum() {
  return (
    <div className="mt-12 ">
      <h2 className="text-2xl font-semibold text-center md:text-left py-4">Nội dung khóa học</h2>
      <Accordion className="w-full" selectionMode="multiple" variant="splitted">
        {chapters.map((chapter) => (
          <AccordionItem
            key={chapter.id}
            aria-label={chapter.title}
            startContent={
              <Avatar
                isBordered
                color="primary"
                name={`C${chapter.id}`}
                radius="lg"
              />
            }
            title={
              <div className="truncate">
                <p className="font-semibold text-sm truncate">{chapter.title}</p>
                <p className="text-sm text-gray-500 truncate">{chapter.description}</p>
              </div>
            }
          >
            <div className="space-y-2">
              {chapter.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {lesson.isFree ? (
                      <PlayCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    ) : (
                      <Lock className="text-gray-400 w-5 h-5 flex-shrink-0" />
                    )}

                    <p className="truncate font-medium">{lesson.title}</p>

                    {lesson.isFree && (
                      <span className="text-xs text-green-600 border border-green-500 px-2 py-0.5 rounded whitespace-nowrap">
                        Free preview
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-gray-500 mt-1 sm:mt-0">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </AccordionItem>
        ))}

      </Accordion>
    </div>
  );
}
