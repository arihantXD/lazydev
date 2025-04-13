import { Router } from "express";
import { AuthRequest } from "../config/authRequest";
import { prisma } from "@repo/db";
import {
  educationSchema,
  experienceSchema,
  linkSchema,
  skillSchema,
  statSchema,
  userSchema,
} from "@repo/schema";

export const portfolioRouter = Router();

portfolioRouter.post("/about-me", async (req, res) => {
  try {
    const parse = userSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.id,
        },
        select: {
          id: true,
          email: true,
          password: false,
        },
      });
      if (!user) {
        res.clearCookie("token");
        res.status(404).json({ message: "User not found, login again" });
        return;
      }
      const finalData = userSchema.safeParse({ ...user, ...req.body });
      if (finalData.success) {
        await prisma.user.update({
          where: {
            id: parse.data.id,
          },
          data: finalData.data,
        });
        res.status(201).json({ message: "User updated successfully" });
        return;
      } else {
        res.status(400).json({ message: "Your data is invalid, try again" });
        return;
      }
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in about me section" });
  }
});

portfolioRouter.get("/about-me/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          password: false,
          aboutMe: true,
          phoneNumber: true,
          place: true,
          occupation: true,
        },
      });
      res.json(user);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in about me section" });
  }
});

portfolioRouter.post("/education", async (req, res) => {
  try {
    const parse = educationSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.userId,
        },
        select: {
          education: true,
        },
      });
      if (!user) {
        res.clearCookie("token");
        res.status(404).json({ message: "User not found, login again" });
        return;
      }
      const finalData = parse.data;
      if (user.education.length < 4 || finalData.id) {
        if (finalData.id) {
          const response = await prisma.education.update({
            where: {
              id: finalData.id,
            },
            data: {
              course: finalData.course,
              school: finalData.school,
              score: finalData.score,
              userId: finalData.userId,
              to: new Date(finalData.to),
              from: new Date(finalData.from),
            },
          });
          res.status(201).json({
            message: "Institute updated successfully",
            data: response,
          });
          return;
        }
        const response = await prisma.education.create({
          data: {
            course: finalData.course,
            school: finalData.school,
            score: finalData.score,
            userId: finalData.userId,
            to: new Date(finalData.to),
            from: new Date(finalData.from),
          },
        });
        res
          .status(201)
          .json({ message: "Institute added successfully", data: response });
        return;
      }
      res
        .status(400)
        .json({ message: "More than 3 institues can not be added" });
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in education section" });
  }
});

portfolioRouter.get("/education/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const educations = await prisma.education.findMany({
        where: {
          userId: userId,
        },
      });
      res.status(200).json(educations);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in education section" });
  }
});

portfolioRouter.delete("/education/:edId", async (req, res) => {
  try {
    const edId = parseInt(req.params.edId);
    if (edId) {
      await prisma.education.delete({
        where: {
          id: edId,
        },
      });
      res.status(200).json({ mesasge: "Became more illitrate successfully" });
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in education section" });
  }
});

portfolioRouter.post("/skills", async (req: AuthRequest, res) => {
  try {
    const parse = skillSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.userId,
        },
        select: {
          skill: true,
        },
      });
      if (!user) {
        res.clearCookie("token");
        res.status(404).json({ message: "User not found, login again" });
        return;
      }
      if (user.skill.length < 4 || parse.data.id) {
        const finalData = parse.data;
        if (finalData.id) {
          const response = await prisma.skill.update({
            where: {
              id: finalData.id,
            },
            data: {
              title: finalData.title,
              userId: finalData.userId,
              skills: finalData.skills,
            },
          });
          res
            .status(201)
            .json({ message: "Skill updated successfully", data: response });
          return;
        }
        const response = await prisma.skill.create({
          data: {
            title: finalData.title,
            userId: finalData.userId,
            skills: finalData.skills,
          },
        });
        res
          .status(201)
          .json({ message: "Skill added successfully", data: response });
        return;
      }
      res.status(400).json({ message: "More than 3 skills can not be added" });
      return;
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in skills section" });
  }
});

portfolioRouter.get("/skill/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const skills = await prisma.skill.findMany({
        where: {
          userId: userId,
        },
      });
      res.status(200).json(skills);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in skills section" });
  }
});

portfolioRouter.delete("/skill/:sdId", async (req, res) => {
  try {
    const sdId = parseInt(req.params.sdId);
    if (sdId) {
      await prisma.skill.delete({
        where: {
          id: sdId,
        },
      });
      res.status(200).json({ message: "Uhh, unskilled prick" });
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in skills section" });
  }
});

portfolioRouter.post("/experience", async (req, res) => {
  try {
    const parse = experienceSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.userId,
        },
        select: {
          workExperience: true,
        },
      });
      if (!user) {
        res.clearCookie("token");
        res.status(404).json({ message: "User not found, login again" });
        return;
      }

      let experienceList = null;
      if (parse.data.userId && parse.data.type) {
        experienceList = await prisma.experience.findMany({
          where: {
            userId: parse.data.userId,
            type: parse.data.type.toString(),
          },
        });
      } else {
        res.status(400).json({ message: "Your data is invalid, try again" });
      }

      const {
        about,
        from,
        to,
        type,
        role,
        gitHubLink,
        liveLink,
        userId,
        companyName,
        tasks,
        id,
      } = parse.data;
      const myRole = role || "";
      const gitLink = gitHubLink || "";
      const liveLink2 = liveLink || "";
      if ((experienceList && experienceList.length < 4) || parse.data.userId) {
        if (id) {
          const response = await prisma.experience.update({
            where: {
              id,
            },
            data: {
              companyName,
              type,
              about,
              userId,
              from: new Date(from),
              to: new Date(to),
              gitHubLink,
              liveLink,
              role,
              tasks: {
                deleteMany: {},
                create: tasks.map((task) => ({ value: task.value })),
              },
            },
            include: {
              tasks: true,
            },
          });
          res.status(201).json({
            message: "Experience updated successfully",
            data: response,
          });
          return;
        }
        const response = await prisma.experience.create({
          data: {
            companyName,
            type,
            about,
            userId,
            role: myRole,
            from: new Date(from),
            to: new Date(to),
            gitHubLink: gitLink,
            liveLink: liveLink2,
            tasks: {
              create: tasks.map((task) => ({ value: task.value })),
            },
          },
          include: {
            tasks: true,
          },
        });
        res
          .status(201)
          .json({ message: "Getting older buddy", data: response });
        return;
      }
      res
        .status(400)
        .json({ message: "More than 3 experiences can not be added" });
      return;
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in experiences section" });
  }
});

portfolioRouter.get("/experience/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { type } = req.query;
    if (userId && type) {
      const experiences = await prisma.experience.findMany({
        where: {
          userId: userId,
          type: type.toString(),
        },
        select: {
          userId: true,
          companyName: true,
          from: true,
          to: true,
          tasks: true,
          id: true,
          role: true,
          type: true,
          gitHubLink: true,
          liveLink: true,
          about: true,
        },
      });
      res.status(200).json(experiences);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in experiences section" });
  }
});

portfolioRouter.delete("/experience/:exId", async (req, res) => {
  try {
    const exdId = parseInt(req.params.exId);
    if (exdId) {
      await prisma.experience.delete({
        where: {
          id: exdId,
        },
      });
      res.status(200).json("Woah, you a fresher ?");
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in experiences section" });
  }
});

portfolioRouter.post("/stats", async (req, res) => {
  try {
    const parse = statSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.userId,
        },
        select: {
          stats: true,
        },
      });
      if (!user) {
        res.clearCookie("token");
        res.status(404).json({ message: "User not found, login again" });
        return;
      }
      if (user.stats.length < 4 || parse.data.id) {
        if (parse.data.id) {
          const response = await prisma.stats.update({
            where: {
              id: parse.data.id,
            },
            data: {
              title: parse.data.title,
              userId: parse.data.userId,
              about: parse.data.about,
            },
          });
          res
            .status(200)
            .json({ message: "Stats updated successfully", data: response });
          return;
        }
        const response = await prisma.stats.create({
          data: {
            title: parse.data.title,
            userId: parse.data.userId,
            about: parse.data.about,
          },
        });
        res
          .status(201)
          .json({ message: "Stats updated successfully", data: response });
        return;
      }
      res.status(400).json({ message: "More than 3 stats can not be set" });
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in stats section" });
  }
});

portfolioRouter.get("/stats/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const stats = await prisma.stats.findMany({
        where: {
          userId: userId,
        },
      });
      res.status(200).json(stats);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in stats section" });
  }
});

portfolioRouter.delete("/stats/:sdId", async (req, res) => {
  try {
    const sdId = parseInt(req.params.sdId);
    if (sdId || sdId === 0) {
      await prisma.stats.delete({
        where: {
          id: sdId,
        },
      });
      res
        .status(200)
        .json({ message: "Bruhhh, have you done anything in life ?" });
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in skills section" });
  }
});

portfolioRouter.post("/link", async (req, res) => {
  try {
    const parse = linkSchema.safeParse(req.body);
    if (parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          id: parse.data.userId,
        },
        select: {
          link: true,
        },
      });
      if (!user) {
        res.status(404).json({ message: "User not found, login again" });
        res.clearCookie("token");
        return;
      }
      if (user.link.length < 4 || parse.data.id) {
        if (parse.data.id) {
          const response = await prisma.link.update({
            where: {
              id: parse.data.id,
            },
            data: {
              title: parse.data.title,
              userId: parse.data.userId,
              url: parse.data.url,
            },
          });
          res
            .status(200)
            .json({ message: "Links updated successfully", data: response });
          return;
        }
        const response = await prisma.link.create({
          data: {
            title: parse.data.title,
            userId: parse.data.userId,
            url: parse.data.url,
          },
        });
        res
          .status(201)
          .json({ message: "Link added successfully", data: response });
        return;
      }
      res.status(400).json({ message: "More than 3 links can not be set" });
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in links section" });
  }
});

portfolioRouter.get("/link/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId) {
      const link = await prisma.link.findMany({
        where: {
          userId: userId,
        },
      });
      res.status(200).json(link);
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in link section" });
  }
});

portfolioRouter.delete("/link/:sdId", async (req, res) => {
  try {
    const sdId = parseInt(req.params.sdId);
    if (sdId) {
      await prisma.link.delete({
        where: {
          id: sdId,
        },
      });
      res.status(200).json({ message: "Not on socials ??" });
    } else {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in link section" });
  }
});
