const baseUrl = 'http://163.172.177.98:8081';

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const fetchUserDetails = async (token: string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!result.ok) {
        throw new Error('Failed to fetch user details');
    }

    const data = await result.json();
    return data;
};

export const createGame = async (token: string) => {
    const response = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to create game');
    }

    const data = await response.json();
    return data;
};

export const fetchAllGames = async (token: string) => {
    const response = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }

    const data = await response.json();
    return data;
};

export const joinGameById = async (token: string, gameId: string) => {
    const response = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to join game');
    }

    const data = await response.json();
    return data;
};
