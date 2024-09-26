# social-network-analyzer
This project is a Social Network Analyzer built using HTML, CSS, JavaScript, and Vis.js for visualizing social networks. It allows users to create and visualize a social network, find the shortest connection path between two users, suggest mutual friends, and detect clusters (communities) of connected users. The project also provides interactive features such as adding and removing connections and rendering the network dynamically.

Features
1. Add Connections
Users can add connections (friendships) between two people.
When a new connection is added, the graph (network) gets updated and displayed in both text format and as a visual graph using Vis.js.
2. Find Shortest Path
Implements the Breadth-First Search (BFS) algorithm to find the shortest path between two users (i.e., the smallest number of connections to reach one person from another).
It helps determine how users are connected in a network.
3. Suggest Friends
Using Depth-First Search (DFS), the system recommends mutual friends (friends of friends) for a given user.
Users can see who they might connect with based on shared connections.
4. Detect Clusters (Communities)
Detects communities within the network by identifying groups of users that are connected through a series of direct or indirect connections using a DFS-based algorithm to find connected components.
5. Remove Connections
Users can also remove a connection between two people, which updates the visual network dynamically.
6. Visualize Network
The network of users is visually represented using Vis.js, where each user is a node, and connections between them are edges.
The network is updated every time a connection is added or removed.
How It Works
Add Connections:
Users enter two names (users) and click the "Add Connection" button to connect them. This will update the internal graph (adjacency list) and render the updated network.

Find Shortest Path:
Users can enter the names of two users and click the "Find Shortest Path" button to find the shortest chain of connections between them.

Friend Suggestions:
Clicking the "Suggest Friends" button will return a list of mutual connections for the selected user, helping them discover potential friends.

Cluster Detection:
Clicking "Detect Clusters" analyzes the network for distinct groups of connected users and displays the clusters found in the network.

Visual Network:
The network of users and their connections is displayed visually using Vis.js. Nodes represent users, and edges represent connections (friendships).

Technologies Used
HTML: To build the user interface.
CSS: For basic styling.
JavaScript: For graph algorithms, event handling, and DOM manipulation.
Vis.js: For visualizing the graph network.
Breadth-First Search (BFS): To find the shortest path between two users.
Depth-First Search (DFS): To suggest mutual friends and detect clusters.
