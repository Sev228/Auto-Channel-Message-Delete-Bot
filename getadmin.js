const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN'; // Replace with your bot token
const bot = new TelegramBot(token, { polling: true });

const channelId = '@yourchannelid'; // Replace with your channel ID

async function getAdmins() {
    try {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-'); 
        const filePath = `adminlist_${timestamp}.txt`;

        const admins = await bot.getChatAdministrators(channelId);
        let adminList = `List of admins (${now.toLocaleString()}):\n`;

        admins.forEach(admin => {
            const user = admin.user;
            const adminInfo = `${user.first_name || ''} ${user.last_name || ''} (${user.id})\n`;
            adminList += adminInfo;
        });

        // File writing
        fs.writeFileSync(filePath, adminList);
        console.log(`List of admins saved in ${filePath}`);

        process.exit(0);

    } catch (error) {
        console.error('Error retrieving admins:', error);
        process.exit(1);
    }
}

getAdmins();