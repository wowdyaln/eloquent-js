#p33 recursive
def find_solution(target)
    def find(start, history, t)
        if start == t
            history
        elsif start > t
            nil
        else
            return find(start+5, "(" + history + " + 5)", t) ||
            find(start * 3, "(" + history + " * 3)", t)
        end
    end
    find(1,"1", target)
end


def kk(target)
    def find(s,h,t)
        puts s.to_s + h + t.to_s
    end
    find(1,"1",target)
end




