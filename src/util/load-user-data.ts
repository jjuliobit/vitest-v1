interface User {
    username: string;
    name: string;
    project: string[];
    coolness?: number;
    favoriteFood: string;
    snacks: boolean;
}

async function loadUser(username: string): Promise<User | undefined> {
    const users: User[] = [
        {
            favoriteFood: 'sushi',
            username: 'burftx',
            name: 'Burko Smith',
            project: ['doces', 'massa'],
            snacks: true
        },
        {
            favoriteFood: 'cookie',
            username: 'jlengstorff',
            name: 'Julio Staff',
            project: ['burgers', 'pizza'],
            snacks: false
        },
    ];
    return users.find((users) => users.username === username);
}


export async function loadUserData(username: string) {
    const user = await loadUser(username);

    if (!user) {
        throw new Error("no user found");
    }

    user.coolness = username === 'burft' ? 100 : -1;

    return user;
}