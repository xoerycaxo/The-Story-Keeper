const onPageLoad = async () => {
    const response = await fetch("/api/books", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        },
    })
    if(response.ok) {
        const data = await response.json()
        console.log(data)
    }
}

onPageLoad();

