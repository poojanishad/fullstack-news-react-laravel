export function getOrCreateUserId() {
    let userId = localStorage.getItem("news_user_id");

    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("news_user_id", userId);
    }

    return userId;
}
