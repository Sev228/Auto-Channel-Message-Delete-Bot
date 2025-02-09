const TelegramBot = require('node-telegram-bot-api'); // Make sure you have this dependency installed
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN"; // Replace with your bot token

if (!TOKEN) {
    throw new Error("The Telegram bot token is not defined. Please set the TELEGRAM_BOT_TOKEN environment variable.");
}

const DELETE_DELAY = 5000; // Delay in milliseconds before deleting unauthorized messages
const YOUR_ID = 'YOUR_ID'; // Replace with your true Telegram ID

// List of authorized admins signatures
const authorizedSignatures = ['Admin Signature 1', 'Admin Signature 2']; //Replace Admin Signature 1, Admin Signature 2 with the signatures of your admins who are allowed to post in the channel...(You can put as many as you want)

// --- Bot Initializing ---
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("Bot started and listening...");

function sendLog(message) {
    bot.sendMessage(YOUR_ID, message).catch((err) => console.error(`Error in log sending:`, err));
}

// Function to manage channel messages
async function handleChannelPost(msg) {
    console.log('Message received:', msg); 

    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const authorSignature = msg.author_signature || 'unknown';

    const logMessage = `Message received in channel ${chatId} with signature ${authorSignature}`;
    console.log(logMessage);
    sendLog(logMessage);

    // Vérifier si la signature est dans la liste des signatures autorisées
    if (!authorizedSignatures.includes(authorSignature)) {
        const adminLogMessage = `Message ${messageId} with signature ${authorSignature} détected. Scheduled deletion in ${DELETE_DELAY / 1000} seconds.`;
        console.log(adminLogMessage);
        sendLog(adminLogMessage);

        // Schedule message to be deleted after timeout
        setTimeout(() => {
            bot.deleteMessage(chatId, messageId)
                .then(() => {
                    const deleteLogMessage = `Message ${messageId} deleted ✅.`;
                    console.log(deleteLogMessage);
                    sendLog(deleteLogMessage);
                })
                .catch((err) => {
                    const errorLogMessage = `Error suppression message ${messageId}: ${err}`;
                    console.error(errorLogMessage);
                    sendLog(errorLogMessage);
                });
        }, DELETE_DELAY);
    }
}

bot.on("channel_post", handleChannelPost);

module.exports = { bot, sendLog, handleChannelPost };
