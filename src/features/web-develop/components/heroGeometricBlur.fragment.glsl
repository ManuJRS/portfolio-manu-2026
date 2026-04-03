#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;
uniform int u_shape;

#define PI 3.1415926535897932384626433832795
#define TWO_PI 6.2831853071795864769252867665590

// 3D rotation matrices
mat3 rotateX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, -s,
        0.0, s, c
    );
}

mat3 rotateY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}

mat3 rotateZ(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat3(
        c, -s, 0.0,
        s, c, 0.0,
        0.0, 0.0, 1.0
    );
}

// Coordinate normalization
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    return p;
}

// Project 3D point to 2D
vec2 project(vec3 p) {
    float perspective = 2.0 / (2.0 - p.z);
    return p.xy * perspective;
}

// Distance from point to line segment
float distToSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

// Draw a line with blur effect
float drawLine(vec2 p, vec2 a, vec2 b, float thickness, float blur) {
    float d = distToSegment(p, a, b);
    return smoothstep(thickness + blur, thickness - blur, d);
}

// Get cube vertices
void getCubeVertices(out vec3 v[8]) {
    float s = 0.7; // Scale down cube
    v[0] = vec3(-s, -s, -s);
    v[1] = vec3( s, -s, -s);
    v[2] = vec3( s,  s, -s);
    v[3] = vec3(-s,  s, -s);
    v[4] = vec3(-s, -s,  s);
    v[5] = vec3( s, -s,  s);
    v[6] = vec3( s,  s,  s);
    v[7] = vec3(-s,  s,  s);
}

// Get tetrahedron vertices
void getTetrahedronVertices(out vec3 v[4]) {
    float a = 1.0 / sqrt(3.0);
    v[0] = vec3( a,  a,  a);
    v[1] = vec3( a, -a, -a);
    v[2] = vec3(-a,  a, -a);
    v[3] = vec3(-a, -a,  a);
}

// Get octahedron vertices
void getOctahedronVertices(out vec3 v[6]) {
    v[0] = vec3( 1.0,  0.0,  0.0);
    v[1] = vec3(-1.0,  0.0,  0.0);
    v[2] = vec3( 0.0,  1.0,  0.0);
    v[3] = vec3( 0.0, -1.0,  0.0);
    v[4] = vec3( 0.0,  0.0,  1.0);
    v[5] = vec3( 0.0,  0.0, -1.0);
}

// Get icosahedron vertices (12 vertices)
void getIcosahedronVertices(out vec3 v[12]) {
    float t = (1.0 + sqrt(5.0)) / 2.0;
    float s = 1.0 / sqrt(1.0 + t * t);
    
    v[0] = vec3(-s, t * s, 0);
    v[1] = vec3( s, t * s, 0);
    v[2] = vec3(-s, -t * s, 0);
    v[3] = vec3( s, -t * s, 0);
    
    v[4] = vec3(0, -s, t * s);
    v[5] = vec3(0,  s, t * s);
    v[6] = vec3(0, -s, -t * s);
    v[7] = vec3(0,  s, -t * s);
    
    v[8] = vec3( t * s, 0, -s);
    v[9] = vec3( t * s, 0,  s);
    v[10] = vec3(-t * s, 0, -s);
    v[11] = vec3(-t * s, 0,  s);
}

// Transform and project vertices
void transformVertices(inout vec3 vertices[12], int count, mat3 rotation, float scale) {
    for (int i = 0; i < 12; i++) {
        if (i < count) {
            vertices[i] = rotation * (vertices[i] * scale);
        }
    }
}

// Draw wireframe shape
float drawWireframe(vec2 p, int shape, mat3 rotation, float scale, float thickness, float blur) {
    float result = 0.0;
    
    if (shape == 0) {
        // Cube - 12 edges
        vec3 v[8];
        getCubeVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 8; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw edges
        // Bottom face
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Top face
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[4]), thickness, blur);
        
        // Vertical edges
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[7]), thickness, blur);
        
    } else if (shape == 1) {
        // Tetrahedron - 6 edges
        vec3 v[4];
        getTetrahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 4; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw all edges
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        
    } else if (shape == 2) {
        // Octahedron - 12 edges
        vec3 v[6];
        getOctahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 6; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw edges connecting to top vertex
        result += drawLine(p, project(v[2]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        
        // Draw edges connecting to bottom vertex
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        
        // Draw middle square
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
        
    } else if (shape == 3) {
        // Icosahedron - 30 edges
        vec3 v[12];
        getIcosahedronVertices(v);
        
        // Transform vertices
        for (int i = 0; i < 12; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw all 30 edges of icosahedron
        // Each vertex connects to exactly 5 others
        
        // Vertex 0 connections
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[0]), project(v[11]), thickness, blur);
        
        // Vertex 1 connections (excluding already drawn)
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[9]), thickness, blur);
        
        // Vertex 2 connections
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[11]), thickness, blur);
        
        // Vertex 3 connections (excluding already drawn)
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        
        // Vertex 4 connections (excluding already drawn)
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[11]), thickness, blur);
        
        // Vertex 5 connections (excluding already drawn)
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        
        // Vertex 6 connections (excluding already drawn)
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[6]), project(v[10]), thickness, blur);
        
        // Vertex 7 connections (excluding already drawn)
        result += drawLine(p, project(v[7]), project(v[10]), thickness, blur);
        
        // Vertex 8 connections (excluding already drawn)
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        
        // Vertex 9 connections (excluding already drawn)
        result += drawLine(p, project(v[9]), project(v[11]), thickness, blur);
        
        // Vertex 10 connections (excluding already drawn)
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
        
    } else if (shape == 4) {
        // Pyramid - 8 edges
        vec3 v[5];
        float s = 0.7; // Scale down pyramid base
        v[0] = vec3(-s, 0.0, -s);
        v[1] = vec3( s, 0.0, -s);
        v[2] = vec3( s, 0.0,  s);
        v[3] = vec3(-s, 0.0,  s);
        v[4] = vec3( 0.0, 1.0,  0.0); // Lower height
        
        // Transform vertices
        for (int i = 0; i < 5; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Base
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Edges to apex
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        
    } else if (shape == 5) {
        // Double pyramid (diamond) - 12 edges
        vec3 v[6];
        float s = 0.6; // Scale down diamond
        v[0] = vec3(-s, 0.0, -s);
        v[1] = vec3( s, 0.0, -s);
        v[2] = vec3( s, 0.0,  s);
        v[3] = vec3(-s, 0.0,  s);
        v[4] = vec3( 0.0,  1.0,  0.0);
        v[5] = vec3( 0.0, -1.0,  0.0);
        
        // Transform vertices
        for (int i = 0; i < 6; i++) {
            v[i] = rotation * (v[i] * scale);
        }
        
        // Middle square
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur);
        
        // Top pyramid
        result += drawLine(p, project(v[0]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        
        // Bottom pyramid
        result += drawLine(p, project(v[0]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur);
        
    } else if (shape == 6) {
        // Hexagonal prism - 18 edges
        vec3 v[12];
        float angleStep = TWO_PI / 6.0;
        
        // Generate hexagon vertices - unrolled loop
        v[0] = vec3(cos(0.0 * angleStep), -1.0, sin(0.0 * angleStep));
        v[1] = vec3(cos(1.0 * angleStep), -1.0, sin(1.0 * angleStep));
        v[2] = vec3(cos(2.0 * angleStep), -1.0, sin(2.0 * angleStep));
        v[3] = vec3(cos(3.0 * angleStep), -1.0, sin(3.0 * angleStep));
        v[4] = vec3(cos(4.0 * angleStep), -1.0, sin(4.0 * angleStep));
        v[5] = vec3(cos(5.0 * angleStep), -1.0, sin(5.0 * angleStep));
        
        v[6] = vec3(cos(0.0 * angleStep), 1.0, sin(0.0 * angleStep));
        v[7] = vec3(cos(1.0 * angleStep), 1.0, sin(1.0 * angleStep));
        v[8] = vec3(cos(2.0 * angleStep), 1.0, sin(2.0 * angleStep));
        v[9] = vec3(cos(3.0 * angleStep), 1.0, sin(3.0 * angleStep));
        v[10] = vec3(cos(4.0 * angleStep), 1.0, sin(4.0 * angleStep));
        v[11] = vec3(cos(5.0 * angleStep), 1.0, sin(5.0 * angleStep));
        
        // Transform vertices - unrolled loop
        v[0] = rotation * (v[0] * scale);
        v[1] = rotation * (v[1] * scale);
        v[2] = rotation * (v[2] * scale);
        v[3] = rotation * (v[3] * scale);
        v[4] = rotation * (v[4] * scale);
        v[5] = rotation * (v[5] * scale);
        v[6] = rotation * (v[6] * scale);
        v[7] = rotation * (v[7] * scale);
        v[8] = rotation * (v[8] * scale);
        v[9] = rotation * (v[9] * scale);
        v[10] = rotation * (v[10] * scale);
        v[11] = rotation * (v[11] * scale);
        
        // Draw bottom hexagon - unrolled
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[4]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[0]), thickness, blur);
        
        // Draw top hexagon - unrolled
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[7]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[8]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[9]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[10]), project(v[11]), thickness, blur);
        result += drawLine(p, project(v[11]), project(v[6]), thickness, blur);
        
        // Draw vertical edges - unrolled
        result += drawLine(p, project(v[0]), project(v[6]), thickness, blur);
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur);
        result += drawLine(p, project(v[2]), project(v[8]), thickness, blur);
        result += drawLine(p, project(v[3]), project(v[9]), thickness, blur);
        result += drawLine(p, project(v[4]), project(v[10]), thickness, blur);
        result += drawLine(p, project(v[5]), project(v[11]), thickness, blur);
        
    } else {
        // Animated morphing shape
        float t = u_time * 0.5;
        float morph = sin(t) * 0.5 + 0.5;
        
        // Morph between cube and octahedron
        vec3 cube[8];
        getCubeVertices(cube);
        
        vec3 octa[6];
        getOctahedronVertices(octa);
        
        // Create morphed vertices
        vec3 v[8];
        for (int i = 0; i < 8; i++) {
            if (i < 6) {
                v[i] = mix(cube[i], octa[i] * 1.5, morph);
            } else {
                v[i] = cube[i] * (1.0 - morph * 0.3);
            }
            v[i] = rotation * (v[i] * scale);
        }
        
        // Draw morphed edges
        float alpha = 1.0 - morph * 0.5;
        
        // Cube edges (fade out as morphing)
        result += drawLine(p, project(v[0]), project(v[1]), thickness, blur) * alpha;
        result += drawLine(p, project(v[1]), project(v[2]), thickness, blur) * alpha;
        result += drawLine(p, project(v[2]), project(v[3]), thickness, blur) * alpha;
        result += drawLine(p, project(v[3]), project(v[0]), thickness, blur) * alpha;
        
        result += drawLine(p, project(v[4]), project(v[5]), thickness, blur) * alpha;
        result += drawLine(p, project(v[5]), project(v[6]), thickness, blur) * alpha;
        result += drawLine(p, project(v[6]), project(v[7]), thickness, blur) * alpha;
        result += drawLine(p, project(v[7]), project(v[4]), thickness, blur) * alpha;
        
        // Morphing diagonals (octahedron-like)
        result += drawLine(p, project(v[0]), project(v[6]), thickness, blur) * morph;
        result += drawLine(p, project(v[1]), project(v[7]), thickness, blur) * morph;
        result += drawLine(p, project(v[2]), project(v[4]), thickness, blur) * morph;
        result += drawLine(p, project(v[3]), project(v[5]), thickness, blur) * morph;
    }
    
    return clamp(result, 0.0, 1.0);
}

// Main rendering function
vec3 render(vec2 st, vec2 mouse) {
    // Calculate mouse influence for hover effect - stronger falloff
    float mouseDistance = length(st - mouse);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
    
    // Smooth rotation based on time and subtle mouse influence
    float time = u_time * 0.2;
    mat3 rotation = rotateY(time + (mouse.x - 0.5) * mouseInfluence * 1.0) * 
                    rotateX(time * 0.7 + (mouse.y - 0.5) * mouseInfluence * 1.0) * 
                    rotateZ(time * 0.1);
    
    // Single layer with elegant parameters
    float scale = 0.35;
    
    // INVERTED: Hover creates blur effect
    // Near mouse: blurry (0.05), far from mouse: sharp (0.0001)
    float blur = mix(0.0001, 0.05, mouseInfluence);
    
    // Dynamic thickness - thicker when blurred, thinner when clear
    float thickness = mix(0.002, 0.003, mouseInfluence);
    
    // Draw wireframe
    float shape = drawWireframe(st, u_shape, rotation, scale, thickness, blur);
    
    /* Trazo alineado a on-surface-variant / surface-tint (~#c6c6c6), no blanco puro */
    vec3 color = vec3(0.612, 0.612, 0.616);
    
    // Subtle dimming on hover (instead of glow)
    float dimming = 1.0 - mouseInfluence * 0.3;
    
    color *= shape * dimming;
    
    // Very subtle vignette for depth
    float vignette = 1.0 - length(st) * 0.2;
    color *= vignette;
    
    // Soft tone mapping
    color = pow(color, vec3(0.9));
    
    return color;
}

void main() {
    vec2 st = coord(gl_FragCoord.xy);
    vec2 mouse = coord(u_mouse * u_pixelRatio) * vec2(1., -1.);
    
    /* Base = surface-container-lowest #0e0e0e (mismo que fondo del hero) */
    vec3 bg = vec3(0.0549, 0.0549, 0.0549);
    vec3 fg = render(st, mouse);
    gl_FragColor = vec4(clamp(bg + fg, 0.0, 1.0), 1.0);
}
