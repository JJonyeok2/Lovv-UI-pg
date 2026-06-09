# SKN_3rd_PJ Discord Reminder Bot

This repository owns the Discord reminder workflow for the `SKN_3rd_PJ` project channel.

The Discord webhook display name is `Notion 알림봇`.

## Schedule

All cron schedules are stored in UTC because GitHub Actions scheduled workflows run on UTC time.

| KST time | UTC cron | Weekdays | Message |
| --- | --- | --- | --- |
| 10:05 | `5 1 * * 1-5` | Monday-Friday | `오전 10시입니다. 에어팟을 끼고 각자 할 일에 집중해주세요. 대화는 DM으로 부탁드려요 🙏` |
| 17:05 | `5 8 * * 1-5` | Monday-Friday | `오후 5시입니다. 오늘 각자 진행상황을 팀 Notion에 업로드해주세요.` |

Scheduled runs are sent only when the actual KST execution time is inside the first 10 minutes of the target hour:

- 10:00-10:14 KST for the focus reminder.
- 17:00-17:14 KST for the progress reminder.

If GitHub Actions starts a scheduled run late, the workflow skips the Discord send step to avoid wrong-time messages.

## Required Secret

Create a Discord incoming webhook for the `SKN_3rd_PJ` channel, then save the webhook URL as a GitHub Actions repository secret:

```text
DISCORD_WEBHOOK_URL
```

Do not commit the real webhook URL to this repository, docs, issue comments, pull requests, or chat logs.

## Manual Test

After the secret is configured, run the workflow manually from GitHub Actions:

1. Open `Actions`.
2. Select `SKN_3rd_PJ Discord Reminders`.
3. Click `Run workflow`.
4. Choose `focus` or `progress`.
5. Confirm the message appears in `SKN_3rd_PJ`.
