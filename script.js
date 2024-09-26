const graph = {};

// Function to add a connection between two users
function addConnection(user1, user2) {
    if (!graph[user1]) graph[user1] = [];
    if (!graph[user2]) graph[user2] = [];
    graph[user1].push(user2);
    graph[user2].push(user1);
    displayConnections();
}

// Function to display current connections
function displayConnections() {
    const connectionsElement = document.getElementById('connections');
    connectionsElement.textContent = JSON.stringify(graph, null, 2);
}

// BFS Algorithm to find the shortest path between two users
function findShortestPath(user1, user2) {
    const queue = [[user1]];
    const visited = new Set();
    visited.add(user1);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];

        if (node === user2) {
            return path;
        }

        if (graph[node]) {
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    const newPath = [...path, neighbor];
                    queue.push(newPath);
                }
            }
        }
    }
    return null;
}

// DFS Algorithm to suggest friends (mutual connections)
function suggestFriends(user) {
    const friends = new Set(graph[user] || []);
    const mutuals = new Set();

    for (const friend of friends) {
        for (const friendOfFriend of graph[friend]) {
            if (friendOfFriend !== user && !friends.has(friendOfFriend)) {
                mutuals.add(friendOfFriend);
            }
        }
    }

    return Array.from(mutuals);
}

// Event listeners for buttons
document.getElementById('addConnectionBtn').addEventListener('click', () => {
    const user1 = document.getElementById('user1').value.trim();
    const user2 = document.getElementById('user2').value.trim();
    if (user1 && user2 && user1 !== user2) {
        addConnection(user1, user2);
    }
});

document.getElementById('findPathBtn').addEventListener('click', () => {
    const user1 = document.getElementById('user1').value.trim();
    const user2 = document.getElementById('user2').value.trim();
    const outputElement = document.getElementById('output');

    if (user1 && user2 && graph[user1] && graph[user2]) {
        const path = findShortestPath(user1, user2);
        if (path) {
            outputElement.textContent = `Shortest Path: ${path.join(' -> ')}`;
        } else {
            outputElement.textContent = `No path found between ${user1} and ${user2}.`;
        }
    }
});

document.getElementById('suggestFriendsBtn').addEventListener('click', () => {
    const user = document.getElementById('user1').value.trim();
    const outputElement = document.getElementById('output');

    if (user && graph[user]) {
        const suggestions = suggestFriends(user);
        outputElement.textContent = `Friend Suggestions: ${suggestions.length > 0 ? suggestions.join(', ') : 'No suggestions available.'}`;
    }
});

// Function to detect clusters using DFS (Connected Components)
function detectClusters() {
    const visited = new Set();
    const clusters = [];

    for (const user in graph) {
        if (!visited.has(user)) {
            const cluster = [];
            dfs(user, visited, cluster);
            clusters.push(cluster);
        }
    }
    return clusters;
}

// Helper DFS function to traverse and collect connected nodes
function dfs(user, visited, cluster) {
    visited.add(user);
    cluster.push(user);

    if (graph[user]) {
        for (const neighbor of graph[user]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, visited, cluster);
            }
        }
    }
}
// Event listener for cluster detection
document.getElementById('detectClustersBtn').addEventListener('click', () => {
    const clusters = detectClusters();
    const outputElement = document.getElementById('output');
    outputElement.textContent = `Clusters Detected:\n${clusters.map((cluster, index) => `Cluster ${index + 1}: ${cluster.join(', ')}`).join('\n')}`;
});

// Function to render the network using Vis.js
function renderNetwork() {
    const nodes = [];
    const edges = [];

    // Create nodes for each user
    for (const user in graph) {
        nodes.push({ id: user, label: user });
        graph[user].forEach(friend => {
            if (!edges.some(edge => (edge.from === user && edge.to === friend) || (edge.from === friend && edge.to === user))) {
                edges.push({ from: user, to: friend });
            }
        });
    }

    const container = document.getElementById('network');
    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
    };
    
    const options = {
        nodes: {
            shape: 'dot',
            size: 20,
            font: {
                size: 15,
                color: '#000',
            },
            borderWidth: 2,
        },
        edges: {
            width: 2,
            color: { color: '#848484' },
        },
        physics: {
            enabled: true,
        },
    };

    const network = new vis.Network(container, data, options);
}

// Event listener to render the network when new connections are added
document.getElementById('addConnectionBtn').addEventListener('click', () => {
    renderNetwork();
});

// Function to remove a connection between two users
function removeConnection(user1, user2) {
    if (graph[user1] && graph[user2]) {
        // Remove user2 from user1's friend list
        graph[user1] = graph[user1].filter(friend => friend !== user2);
        
        // Remove user1 from user2's friend list
        graph[user2] = graph[user2].filter(friend => friend !== user1);
        
        displayConnections();
    } else {
        alert("One or both users do not exist.");
    }
}

// Event listener for removing connections
document.getElementById('removeConnectionBtn').addEventListener('click', () => {
    const user1 = document.getElementById('user1').value.trim();
    const user2 = document.getElementById('user2').value.trim();
    
    if (user1 && user2 && user1 !== user2) {
        removeConnection(user1, user2);
        renderNetwork(); // Re-render the network visualization after removal
    }
});