
const dbClient = require('./db/client')

async function statusUpdate(status, blogId) {
    try {
        await dbClient.query(
            "UPDATE blog SET status = $1 WHERE id = $2",
            [status, blogId]
        );
        return true
    } catch (err) {
        console.error('[Error] update status blog...!!!', err)
    }
}

module.exports = statusUpdate