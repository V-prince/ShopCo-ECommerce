export const GeminiAiChatBot = async (message) => {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:5000/api/ai/gemini/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: token,
        },
        body: JSON.stringify({message})
    })
    const data = await res.json()
    return data
}