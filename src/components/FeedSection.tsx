"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  Menu,
  Loader2,
} from "lucide-react";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}

// Generate more sample posts
const generateMorePosts = (startId: number): Post[] => {
  const avatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  ];

  const images = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1200&h=800&fit=crop",
  ];

  const contents = [
    "Exploring new frontiers in quantum computing! 🚀 #FutureTech",
    "Just finished implementing a neural network from scratch. The possibilities are endless! 💡",
    "Virtual reality is evolving faster than we think. Who's excited for the next big breakthrough? 🌐",
    "AI and human creativity - a perfect symbiosis. What's your take on this? 🤖✨",
  ];

  return Array.from({ length: 5 }, (_, i) => ({
    id: startId + i,
    author: {
      name: ["Alex Rivers", "Sarah Chen", "Mike Zhang", "Emma Watson"][
        Math.floor(Math.random() * 4)
      ],
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
    },
    content: contents[Math.floor(Math.random() * contents.length)],
    image:
      Math.random() > 0.5
        ? images[Math.floor(Math.random() * images.length)]
        : undefined,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 200),
    shares: Math.floor(Math.random() * 100),
    timeAgo: `${Math.floor(Math.random() * 12)}h`,
  }));
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Alex Rivers",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    },
    content: "Just deployed my latest AI project! The future is here 🚀",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    likes: 423,
    comments: 89,
    shares: 32,
    timeAgo: "2h",
  },
  {
    id: 2,
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    content:
      "Exploring the boundaries of quantum computing and its implications for the future of technology. What are your thoughts on quantum supremacy?",
    likes: 892,
    comments: 156,
    shares: 74,
    timeAgo: "4h",
  },
];

export function Feed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPosts = generateMorePosts(posts.length + 1);
    setPosts((prev) => [...prev, ...newPosts]);
    setLoading(false);

    // Stop infinite scroll after certain amount of posts
    if (posts.length > 30) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [posts.length, loading, hasMore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* New Post Input */}
          <Card className="p-4 backdrop-blur-lg bg-card/80 border border-border/50 mb-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                  alt="Your avatar"
                />
              </Avatar>
              <div className="flex-1 space-y-4">
                <Input
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="bg-background/50"
                />
                <div className="flex justify-end">
                  <Button className="w-full sm:w-auto">Post</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4 sm:space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden backdrop-blur-lg bg-card/80 border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="p-3 sm:p-4">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                        <img src={post.author.avatar} alt={post.author.name} />
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">
                          {post.author.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {post.timeAgo}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9"
                    >
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <p className="mb-4 text-sm sm:text-base">{post.content}</p>
                  {post.image && (
                    <div className="relative -mx-3 sm:-mx-4 mb-4 aspect-video">
                      <img
                        src={post.image}
                        alt="Post image"
                        className="object-cover w-full"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 h-8 px-2 sm:px-3"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 h-8 px-2 sm:px-3"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">
                        {post.comments}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 sm:gap-2 h-8 px-2 sm:px-3"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">{post.shares}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 sm:px-3"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Loading State & Infinite Scroll Trigger */}
            <div ref={loaderRef} className="py-4 flex justify-center">
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Loading more posts...</span>
                </div>
              )}
              {!hasMore && (
                <p className="text-sm text-muted-foreground">
                  No more posts to load
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
