---
title: "Majsoul Email Reviewer"
excerpt: "A email reviewer that can be used to streamline the Majsoul game review process with an AI <br><img src='/images/portfolio/majsoul-reviewer.gif'>"
collection: portfolio
language: "Python, Selenium, poplib, smtplib"
date: 2022-06-05
---

<img src='/images/portfolio/majsoul-reviewer.gif'>

This is an email reviewer for the game Majsoul (雀魂麻将), which is a game online that recreates the classical Japanese Riichi Mahjong. The script listens for any email sent to a specific email account, and starts a subprocess by using [Akochan](https://github.com/critter-mj/akochan) (deprecated, now named [Mortal](https://github.com/Equim-chan/Mortal)) to analyze your plays. Compiles all the plays you have made throughout the game and highlights any misplays that you have done. 

Used a script provided by *mjg* to download logs from Majsoul, and leaves them in a directory in the Tenhou format. Then, calls Akochan AI to analyze it. This whole pipeline is automated, so a player only has to play a game, then send their match history to the email account that is being listened, and will receive an automated analysis after a few minutes. 

The script utilizes **POP3** to receive and parse emails, **Selenium** to mimic user inputs to download the game log, uses **subprocess** to run the actual analysis with Akochan AI, then sends the email with the analysis back using **SMTP**. 

Note: Unavailable now, as I have to keep a device running this script all the time. Furthermore, Mortal is now publicly available to analyze Majsoul games. 

The GitHub link is available [here](https://github.com/Lei-Tin/MajsoulEmailReviewer). 
