---
title: "Dealing with technical interviews in 2026"
date: 2026-11-17
excerpt: "A guide on how to demonstrate excellence in an AI era"
tags:
  - AI
  - Software Engineering
  - Interviews
---

**~~My roommate asked me to post this blog because he found it very helpful, so here it is.~~**

I've recently did an interview that was quite "surprising" to me. This interview consisted of 2 stages, the first stage being a mock Pull Request review, and the second stage being a whole project repository, and you're tasked to fix some bugs with the help of an AI Agent tool.

This is truly an unique experience, as most of my other interviews really just asked me Leetcode or behavioral questions.

This experience made me start to question, if AI Agents are allowed in technical interviews, how should you demonstrate excellence to the interviewer?

My answer to that is, demonstrating knowledge of **fundamentals, decision making, and awareness of tradeoffs**.

## 1. PR Review

I was given a fairly generic PR (~200 lines, definitely not written by AI) to implement a feature, with a large number of "weird" ways to do things.

I did the following:

1. Point out that I'm not familiar with the langauge being used, but I will treat the interviewer as the person who wrote this PR, and ask him questions accordingly. Also mentioning that, in a real world scenario, this kind of cases happen frequently, as your co-workers could chose to implement a feature in any way they wanted to, and it is the reviewer's responsibility to be sure that issues are being caught before ending up in deployment.
2. Started taking down notes (annotating weird parts line by line). For example, I noted the following:
    1. Weird return values
    2. No docstrings for methods
    3. Inadequate error handling (needs to notify the caller that it could throw errors)
    4. Potential serialization bug as the execution is not wrapped within a transaction
    5. Weird spaces in strings
    6. `__str__` implementation weird, doesn't display all information
    7. No unit tests
    8. Sensitive information might be disclosed. **For this, I deviated away and mentioned my knowledge on [password hashing](https://bitwarden.com/resources/what-is-password-hashing/) when stored in databases**
    9. No input sanitation is done, could lead to [SQL injection](https://www.w3schools.com/sql/sql_injection.asp) attacks
    10. [Magic numbers](https://en.wikipedia.org/wiki/Magic_number_(programming)) (default values, field lengths, etc.) being chosen without any documentations anywhere
3. While taking down notes, I provided my opinion on each of the bullet points above, and why this is problematic. A lot of these knowledge really just comes from my foundational knowledge, from courses I've taken before.
4. By the end of the line-by-line review, I told him that it is probably a better idea that we have a design document that outlines a lot of these choices, so it's easier for the reviewer to locate why a certain decision was made.
5. Then, I left a general note on the missing parts, small issues, and we finished this stage.

By the end of this stage, my reviewer asked me on a question related to the trade offs between spending time designing vs implementating.

To which I answered:

> The tradeoff is dependent on how urgent and fault-tolerant the system is. But a document artifact must be present for any code change, as that is how we can keep the design choices transparent and easily referenced upon when needed.

**Then, he told me that my answers in this task is 10/10, and really demonstrates my understanding as a software engineer**

**Quick Summary**: Knowledge from previous projects, courses, could really be something that you can refer to when you make decisions. And, even if you don't understand the material completely, you can still demonstrate understanding in relevant fields, like what I did for the "sensitive information" lines. These combined really just shows the interviewer that you do understand what you're doing, and you're not just an "AI Wrapper".

## 2. Implementing feature changes with an AI Agent

I was then given a file that outlined the tasks that I have to do, as well as a whole repository of maybe 100 ish files? Maybe more, unsure.

I first told the interviewer that, if I was assigned this task, I will first let the AI Agent give a quick summary and rundown through the repository and tell me any relevant details, such as how the repository is laid out, what this repository does, what are the business logic that is going on in this repository. I also told him while my AI Agent is working on that, I can start reading the task list in greater details.

Then, I told him that I'm assuming the tasks I'm assigned comes from customer tickets, and I am the only one that is responsible to fix them. Then I immediately told him, "under this assumption, I will first let my agent try and reproduce the bug locally". I'm saying this to emphasize the fact that, "I have knowledge on how production codebases work, and we don't just get these summarized information for free".

Up until this point, all I've done is really just understanding the task, without any actions. This is because, I wanted to reinforce the image that I am very cautious about using AI Agents to make large scale modifications to the repository, leading to uncontrollable developments.

Finally, I asked the agent to focus on one specific task first only. I asked it to implement a potential fix to it, while also asking it to help me verify if there was a concurrency bug to it or not. This is because, while my AI Agent summmarized the repository, I noticed an issue on the repository, where multiple clients could potentially lead to a race condition, and might cause another issue. Furthermore, I also asked the agent to commit the fix for the initial issue in just one commit away from the `remote HEAD`, this ensures that it is easier for us to rollback or trace to any potential issues later on.

Then, my AI Agent did tell me that it was able to reproduce a concurrency bug on top of the issue that we were fixing. To which, I asked the agent to fix by doing an atomic transaction.

After fixing both of these issues, I ran out of time for my interview. To my surprise, the interviewer told me that out of all the candidates he interviewed, he had never seen anyone point out that concurrency bug before. And he told me that I did a very fantastic job in demonstrating that I can really work hands-on with the project.

**Quick Summary**: Again in this section, all I did was emphasizing that I am not an SWE that just blindly clicks "Accept" for the AI Agent, and really does think independently to work on codebases. I demonstrated the fact that I have fundamental knowledge in a lot of things I'm doing, and it will help me complete this task better. I think being able to demonstrate this is an extremely positive signal for the interviewer, as you're demonstrating the need for the company to hire you, instead of just getting more AI credit for other SWEs.

## Ending Notes

A lot of the seemingly useless information that you end up learning from courses, websites, videos, might really come in handy in the future.

Being able to demonstrate that you're still a trustworthy human being, that can sometimes make decisions better than AI is still very valueable, as of now.

Besides, being able to hone your own skills and become better at fundamentals is always a persistent growth that will go with you for a long way, even when tools like AI Agents are available.
