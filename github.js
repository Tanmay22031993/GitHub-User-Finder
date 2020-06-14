class GitHub {
    constructor() {
        this.client_id = '197f3cdc823a8c834f69';
        this.client_secret = '36b68f34d1967bb323b8e00af5af7523d7356b2f';
        this.baseURL = 'https://api.github.com';
    }
    //HTTP GET
    async getUser(user) {
        const profileResponse = await fetch(
            `${this.baseURL}/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        );

        const reposResponse = await fetch(
            `${this.baseURL}/users/${user}/repos?per_page=5&sort=created:asc?client_id=${this.client_id}&client_secret=${this.client_secret}`
        );
        //this.handleErrors(profileResponse);
        const profile = await profileResponse.json();
        const repos = await reposResponse.json();
        return { profile, repos };
    }

    handleErrors(res) {
        if (!res.ok) throw new Error(res.statusText);
        return res;
    }
}
