$(function () {
  // Fly Balls
  (function () {
    class FlyingSphere {
	    constructor(element) {
	        this.element = element;
	        this.speed = parseFloat(element.dataset.speed) || 2;
	        this.isFlying = false;
	        this.animationId = null;
	        this.direction = { x: 0, y: 0 };
	        this.friction = 0.9995;
	        this.minSpeed = 0.1;
	        this.radius = element.offsetWidth / 2; // Радиус шарика
	        this.mass = this.radius; // Масса пропорциональна радиусу
	        
	        this.init();
	    }
	
	    init() {
	        const computedStyle = window.getComputedStyle(this.element);
	        if (computedStyle.position === 'static') {
	            this.element.style.position = 'absolute';
	        }
	
	        this.element.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
	        window.addEventListener('blur', () => this.pauseFlying());
	        window.addEventListener('focus', () => this.resumeFlying());
	    }
	
	    handleMouseEnter(e) {
	        if (!this.isFlying) {
	            this.applyInitialForce(e);
	        } else {
	            this.addAdditionalForce(e);
	        }
	    }
	
	    applyInitialForce(e) {
	        const rect = this.element.getBoundingClientRect();
	        const mouseX = e.clientX;
	        const mouseY = e.clientY;
	        
	        const centerX = rect.left + rect.width / 2;
	        const centerY = rect.top + rect.height / 2;
	        
	        const deltaX = mouseX - centerX;
	        const deltaY = mouseY - centerY;
	        
	        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	        this.direction.x = -deltaX / length;
	        this.direction.y = -deltaY / length;
	        
	        const force = Math.min(length / 50, 3);
	        this.speed = 2 + force;
	        
	        this.startFlying();
	    }
	
	    addAdditionalForce(e) {
	        const rect = this.element.getBoundingClientRect();
	        const mouseX = e.clientX;
	        const mouseY = e.clientY;
	        
	        const centerX = rect.left + rect.width / 2;
	        const centerY = rect.top + rect.height / 2;
	        
	        const deltaX = mouseX - centerX;
	        const deltaY = mouseY - centerY;
	        
	        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	        const forceX = -deltaX / length;
	        const forceY = -deltaY / length;
	        
	        const forceStrength = Math.min(length / 100, 2);
	        this.direction.x = (this.direction.x + forceX * forceStrength) / (1 + forceStrength);
	        this.direction.y = (this.direction.y + forceY * forceStrength) / (1 + forceStrength);
	        
	        const dirLength = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
	        this.direction.x /= dirLength;
	        this.direction.y /= dirLength;
	        
	        this.speed = Math.min(this.speed + forceStrength * 0.5, 8);
	    }
	
	    getPosition() {
	        const rect = this.element.getBoundingClientRect();
	        return {
	            x: rect.left + this.radius,
	            y: rect.top + this.radius
	        };
	    }
	
	    checkCollision(otherSphere) {
	        if (this === otherSphere || !this.isFlying || !otherSphere.isFlying) return false;
	
	        const pos1 = this.getPosition();
	        const pos2 = otherSphere.getPosition();
	        
	        const dx = pos1.x - pos2.x;
	        const dy = pos1.y - pos2.y;
	        const distance = Math.sqrt(dx * dx + dy * dy);
	        
	        return distance < (this.radius + otherSphere.radius);
	    }
	
	    resolveCollision(otherSphere) {
	        const pos1 = this.getPosition();
	        const pos2 = otherSphere.getPosition();
	        
	        const dx = pos2.x - pos1.x;
	        const dy = pos2.y - pos1.y;
	        const distance = Math.sqrt(dx * dx + dy * dy);
	        
	        if (distance === 0) return;
	        
	        const nx = dx / distance;
	        const ny = dy / distance;
	        
	        const dvx = otherSphere.direction.x * otherSphere.speed - this.direction.x * this.speed;
	        const dvy = otherSphere.direction.y * otherSphere.speed - this.direction.y * this.speed;
	        
	        const speedAlongNormal = dvx * nx + dvy * ny;
	        
	        if (speedAlongNormal > 0) return;
	        
	        const restitution = 0.8;
	        
	        const impulse = 2 * speedAlongNormal / (this.mass + otherSphere.mass) * restitution;
	        
	        this.direction.x += impulse * otherSphere.mass * nx;
	        this.direction.y += impulse * otherSphere.mass * ny;
	        otherSphere.direction.x -= impulse * this.mass * nx;
	        otherSphere.direction.y -= impulse * this.mass * ny;
	        
	        const length1 = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
	        const length2 = Math.sqrt(otherSphere.direction.x * otherSphere.direction.x + otherSphere.direction.y * otherSphere.direction.y);
	        
	        if (length1 > 0) {
	            this.direction.x /= length1;
	            this.direction.y /= length1;
	        }
	        if (length2 > 0) {
	            otherSphere.direction.x /= length2;
	            otherSphere.direction.y /= length2;
	        }
	        
	        const totalSpeed = this.speed + otherSphere.speed;
	        const speedRatio1 = this.speed / totalSpeed;
	        const speedRatio2 = otherSphere.speed / totalSpeed;
	        
	        this.speed = totalSpeed * speedRatio2 * 0.9;
	        otherSphere.speed = totalSpeed * speedRatio1 * 0.9;
	        
	        this.separateBalls(otherSphere, pos1, pos2);
	    }
	
	    separateBalls(otherSphere, pos1, pos2) {
	        const dx = pos2.x - pos1.x;
	        const dy = pos2.y - pos1.y;
	        const distance = Math.sqrt(dx * dx + dy * dy);
	        const overlap = (this.radius + otherSphere.radius) - distance;
	        
	        if (overlap > 0) {
	            const nx = dx / distance;
	            const ny = dy / distance;
	            
	            const separation = overlap / 2;
	            
	            const currentX1 = parseFloat(this.element.style.left) || 0;
	            const currentY1 = parseFloat(this.element.style.top) || 0;
	            const currentX2 = parseFloat(otherSphere.element.style.left) || 0;
	            const currentY2 = parseFloat(otherSphere.element.style.top) || 0;
	            
	            this.element.style.left = (currentX1 - nx * separation) + 'px';
	            this.element.style.top = (currentY1 - ny * separation) + 'px';
	            otherSphere.element.style.left = (currentX2 + nx * separation) + 'px';
	            otherSphere.element.style.top = (currentY2 + ny * separation) + 'px';
	        }
	    }
	
	    startFlying() {
	        if (this.isFlying) return;
	        
	        this.isFlying = true;
	        this.element.style.transition = 'none';
	        this.fly();
	    }
	
	    pauseFlying() {
	        if (this.animationId) {
	            cancelAnimationFrame(this.animationId);
	            this.animationId = null;
	        }
	    }
	
	    resumeFlying() {
	        if (this.isFlying && !this.animationId) {
	            this.fly();
	        }
	    }
	
	    stopFlying() {
	        this.isFlying = false;
	        this.pauseFlying();
	        this.element.style.transition = 'all 0.3s ease';
	    }
	
	    fly() {
	        if (!this.isFlying) return;
	
	        const rect = this.element.getBoundingClientRect();
	        const maxX = window.innerWidth - rect.width;
	        const maxY = window.innerHeight - rect.height;
	
	        let currentX = parseFloat(this.element.style.left) || 
	                      parseFloat(window.getComputedStyle(this.element).left) || 0;
	        let currentY = parseFloat(this.element.style.top) || 
	                      parseFloat(window.getComputedStyle(this.element).top) || 0;
	
	        currentX += this.direction.x * this.speed;
	        currentY += this.direction.y * this.speed;
	
	        let bounced = false;
	        
	        if (currentX <= 0) {
	            currentX = 0;
	            this.direction.x = Math.abs(this.direction.x);
	            bounced = true;
	        } else if (currentX >= maxX) {
	            currentX = maxX;
	            this.direction.x = -Math.abs(this.direction.x);
	            bounced = true;
	        }
	
	        if (currentY <= 0) {
	            currentY = 0;
	            this.direction.y = Math.abs(this.direction.y);
	            bounced = true;
	        } else if (currentY >= maxY) {
	            currentY = maxY;
	            this.direction.y = -Math.abs(this.direction.y);
	            bounced = true;
	        }
	
	        FlyingSphere.checkAllCollisions(this);
	
	        if (bounced) {
	            this.speed *= 0.95;
	        }
	        this.speed *= this.friction;
	
	        this.element.style.left = currentX + 'px';
	        this.element.style.top = currentY + 'px';
	
	        if (this.speed < this.minSpeed) {
	            this.stopFlying();
	        } else {
	            this.animationId = requestAnimationFrame(() => this.fly());
	        }
	    }
	
	    static checkAllCollisions(currentSphere) {
	        if (!FlyingSphere.allSpheres) return;
	        
	        FlyingSphere.allSpheres.forEach(otherSphere => {
	            if (currentSphere !== otherSphere && currentSphere.checkCollision(otherSphere)) {
	                currentSphere.resolveCollision(otherSphere);
	            }
	        });
	    }
	}
	
	document.addEventListener('DOMContentLoaded', () => {
	    const spheres = document.querySelectorAll('.sphere');
	    FlyingSphere.allSpheres = [];
	    
	    spheres.forEach(sphere => {
	        FlyingSphere.allSpheres.push(new FlyingSphere(sphere));
	    });
	});
	
	window.addEventListener('resize', () => {
	    const spheres = document.querySelectorAll('.sphere');
	    spheres.forEach(sphere => {
	        const rect = sphere.getBoundingClientRect();
	        const maxX = window.innerWidth - rect.width;
	        const maxY = window.innerHeight - rect.height;
	        
	        let currentX = parseFloat(sphere.style.left) || 
	                      parseFloat(window.getComputedStyle(sphere).left) || 0;
	        let currentY = parseFloat(sphere.style.top) || 
	                      parseFloat(window.getComputedStyle(sphere).top) || 0;
	        
	        if (currentX > maxX) sphere.style.left = maxX + 'px';
	        if (currentY > maxY) sphere.style.top = maxY + 'px';
	    });
	});
  })();
  
  // Size Balls
  (function () {
  	const sphere = document.querySelector('.sphere-size');
	let isDragging = false;
	let startX, startY, initialX, initialY;
	
	sphere.addEventListener('mousedown', (e) => {
	    if (e.button === 0) {
	        isDragging = true;
	        
	        startX = e.clientX;
	        startY = e.clientY;
	        
	        const style = window.getComputedStyle(sphere);
	        initialX = parseInt(style.left) || startX-61;
	        initialY = parseInt(style.top) || startY-61;
	        
	        sphere.style.cursor = 'grabbing';
	        sphere.style.position = 'fixed';
	        e.preventDefault();
	    }
	});
	
	document.addEventListener('mousemove', (e) => {
	    if (!isDragging) return;
	    
	    const deltaX = e.clientX - startX;
	    const deltaY = e.clientY - startY;
	    
	    sphere.style.left = (initialX + deltaX) + 'px';
	    sphere.style.top = (initialY + deltaY) + 'px';
	});
	
	document.addEventListener('mouseup', (e) => {
	    if (e.button === 0) {
	        isDragging = false;
	        sphere.style.cursor = 'grab';
	    }
	});
	
	sphere.addEventListener('wheel', (e) => {
	    if (isDragging) {
	        e.preventDefault();
	        
	        const style = window.getComputedStyle(sphere);
	        const transform = style.transform;
	        let currentScale = 1;
	        
	        if (transform && transform !== 'none') {
	            const matrix = transform.match(/matrix\(([^)]+)\)/);
	            if (matrix) {
	                const values = matrix[1].split(', ');
	                currentScale = parseFloat(values[0]);
	            }
	        }
	        
	        const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
	        const newScale = Math.max(0.1, Math.min(4.2, currentScale * scaleChange));
	        
	        sphere.style.transform = `scale(${newScale})`;
	    }
	});
	
	sphere.style.cursor = 'grab';
	sphere.style.transform = sphere.style.transform || 'scale(1)';
  })();
});