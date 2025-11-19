from collections import deque, defaultdict

class Graph:
    """
    Représentation du graphe non orienté avec liste d'adjacence.
    Complexité spatiale: O(|S| + |A|)
    """
    def __init__(self, vertices):
        self.V = vertices  # Nombre de sommets
        self.adj = defaultdict(list)  # Liste d'adjacence
    
    def add_edge(self, u, v):
        """Ajoute une arête non orientée entre u et v"""
        self.adj[u].append(v)
        self.adj[v].append(u)
    
    def bfs_shortest_cycle(self, start):
        """
        BFS à partir d'un sommet pour trouver le plus court cycle passant par ce sommet.
        
        Complexité: O(|S| + |A|) pour un BFS
        
        Principe:
        - On parcourt le graphe en BFS depuis le sommet de départ
        - On garde trace de la distance et du parent de chaque sommet
        - Si on trouve une arête vers un sommet déjà visité (qui n'est pas le parent),
          on a trouvé un cycle
        - La longueur du cycle = distance[u] + distance[v] + 1
        
        Returns:
            tuple: (longueur du cycle, liste des sommets du cycle) ou (float('inf'), [])
        """
        visited = [-1] * self.V  # Distance depuis le début (-1 = non visité)
        parent = [-1] * self.V   # Parent dans l'arbre BFS
        queue = deque([start])
        visited[start] = 0
        
        min_cycle_length = float('inf')
        cycle_endpoints = None
        
        while queue:
            u = queue.popleft()
            
            for v in self.adj[u]:
                if visited[v] == -1:
                    # Sommet non visité
                    visited[v] = visited[u] + 1
                    parent[v] = u
                    queue.append(v)
                elif parent[u] != v:
                    # On a trouvé un cycle (v est visité et n'est pas le parent de u)
                    cycle_length = visited[u] + visited[v] + 1
                    if cycle_length < min_cycle_length:
                        min_cycle_length = cycle_length
                        cycle_endpoints = (u, v, visited[u], visited[v])
        
        if min_cycle_length == float('inf'):
            return float('inf'), []
        
        # Reconstruire le cycle
        cycle = self._reconstruct_cycle(cycle_endpoints, parent, start)
        return min_cycle_length, cycle
    
    def _reconstruct_cycle(self, endpoints, parent, start):
        """Reconstruit le chemin du cycle à partir des endpoints"""
        u, v, dist_u, dist_v = endpoints
        
        # Chemin de u vers start
        path_u = []
        current = u
        while current != -1:
            path_u.append(current)
            current = parent[current]
        path_u.reverse()
        
        # Chemin de v vers start
        path_v = []
        current = v
        while current != -1:
            path_v.append(current)
            current = parent[current]
        path_v.reverse()
        
        # Trouver l'ancêtre commun
        i = 0
        while i < len(path_u) and i < len(path_v) and path_u[i] == path_v[i]:
            i += 1
        
        # Construire le cycle
        cycle = path_u[i-1:] + path_v[i:][::-1]
        return cycle
    
    def find_shortest_cycle(self):
        """
        Trouve le plus court cycle dans tout le graphe.
        
        Complexité totale: O(|S| * (|S| + |A|))
        - On lance un BFS depuis chaque sommet: |S| fois
        - Chaque BFS coûte O(|S| + |A|)
        
        Returns:
            dict: {
                'length': longueur du cycle,
                'cycle': liste des sommets,
                'exists': booléen
            }
        """
        min_cycle_length = float('inf')
        shortest_cycle = []
        
        # Lancer BFS depuis chaque sommet
        for vertex in range(self.V):
            length, cycle = self.bfs_shortest_cycle(vertex)
            if length < min_cycle_length:
                min_cycle_length = length
                shortest_cycle = cycle
        
        if min_cycle_length == float('inf'):
            return {
                'length': None,
                'cycle': [],
                'exists': False,
                'message': 'Aucun cycle trouvé dans le graphe'
            }
        
        return {
            'length': min_cycle_length,
            'cycle': shortest_cycle,
            'exists': True,
            'message': f'Plus court cycle de longueur {min_cycle_length}'
        }


def process_graph_input(edges, num_vertices):
    """
    Traite l'input et trouve le plus court cycle.
    
    Args:
        edges: Liste de tuples (u, v) représentant les arêtes
        num_vertices: Nombre de sommets dans le graphe
    
    Returns:
        dict: Résultat contenant le cycle et les informations
    """
    g = Graph(num_vertices)
    
    for u, v in edges:
        g.add_edge(u, v)
    
    result = g.find_shortest_cycle()
    
    # Ajouter les informations de complexité
    result['complexity'] = {
        'time': f'O(|S| × (|S| + |A|)) = O({num_vertices} × ({num_vertices} + {len(edges)})) = O({num_vertices * (num_vertices + len(edges))})',
        'space': f'O(|S| + |A|) = O({num_vertices} + {len(edges)})',
        'explanation': 'BFS depuis chaque sommet, chaque BFS coûte O(|S| + |A|)'
    }
    
    return result